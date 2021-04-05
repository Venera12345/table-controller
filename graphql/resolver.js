const Table = require('../model/Tabel')
const Client = require('../model/Client')
const Order = require('../model/Order')
module.exports = {
    async postTable({table: {name}}) {
        try {
            const tableNew = await new Table({
                name,
                status: 'empty',
                count_client: 0,
                amount_execute_order: 0
            }).save()
            return tableNew
        } catch (e) {
            console.log(e)
        }
    },
    async getTable({param: {type}}) {
        try {
            let tablesFilter
            if (type === '') tablesFilter = await Table.find()
            if (type === 'status') tablesFilter = await Table.find({[type]: 'empty'})
            if (type === 'amount_execute_order') {
                const tablesList = await Table.find()
                tablesFilter = tablesList.filter((a) => {
                    return a.amount_execute_order > 0
                })
            }
            return tablesFilter
        } catch (e) {
            console.log(e)
        }
    },
    async postOrder({order: {describe, client}}) {
        try {
            const clientOrder = await Client.findOne({_id: client})
            const order = await new Order({
                table: clientOrder.table,
                describe: describe,
                client: client,
                status: 'not done'
            }).save()
            let orders = clientOrder.orders
            orders.push(order._id)
            await Client.findOneAndUpdate({_id: client}, {orders: orders})
            const tableStatus = await Table.findOne({_id: clientOrder.table})
            await Table.findOneAndUpdate(
                {_id: clientOrder.table},
                {amount_execute_order: tableStatus.amount_execute_order + 1})
            return order
        } catch (e) {
            console.log(e)
        }
    },
    async putOrder({id: {id, table}}) {
        try {
            const tableOne = await Table.findOne({_id: table})
            await Table.findOneAndUpdate({_id: tableOne._id}, {amount_execute_order: tableOne.amount_execute_order - 1})
            const order = await Order.findOneAndUpdate({_id: id}, {status: 'done'}, {new: true}).populate('orderID', 'status')
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    },
    async getClient({id}) {
        try {
            return await Client.find({table: id}).populate('orders', '_id describe status', 'order');
        } catch (e) {
            console.log(e)
        }
    },
    async postClient({client: {name, table}}) {
        try {
            const tableStatus = await Table.findById(table)
            await Table.findOneAndUpdate(
                {_id: table},
                {status: 'full', count_client: tableStatus.count_client + 1})
            const clientNew = await new Client({
                name: name,
                table: table,
                orders: []
            }).save()
            return clientNew.populate('table', '_id', 'table');
        } catch (e) {
            console.log(e)
        }
    },
    async deleteClient({id}) {
        try {
            const client = await Client.findOne({_id: id}).populate('orders', 'status', 'order')
            const tableStatus = await Table.findById(client.table)
            let count = 0
            if (client.orders.length > 0) {
                client.orders.forEach(async (item) => {
                    if (item.status !== 'done') {
                        count++
                    }
                    await Order.remove({_id: item._id})
                })
            }
            await Table.findOneAndUpdate(
                {_id: client.table},
                {
                    status: tableStatus.count_client === 1 ? 'empty' : 'full',
                    count_client: tableStatus.count_client - 1,
                    amount_execute_order: tableStatus.amount_execute_order - count
                })
            await Client.remove({_id: id})
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
}