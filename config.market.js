var config = {

	// Posting something for sale, or posting a "want to buy" order costs CREDITS.
	// price*amount*0.05 credits are require to make the posting
	// Game.market.createOrder(type, resourceType, price, totalAmount, [roomName])

	// Fulfilling someone else's post (IE: filling a WTB order with my minerals) costs ENERGY from my TERMINAL
	// Energy cost = Game.market.calcTransactionCost(amount, roomName1, roomName2)
	// Game.market.deal(orderId, amount, [yourRoomName])

	// Dec 11, 2016: someone buying Z:  id:584e13e55b70b4e57aaf7d85	0.15	20,000	20,000	W50S70	9
	// Game.market.calcTransactionCost(1000, 'W57S79', 'W50S70')
    init: function(){
	}
};

module.exports = config;
