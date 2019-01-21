pragma solidity>=0.4.25;

contract BagCount {
    
    //used to record a delivery
    struct Delivery {
        address center;
        uint bagCount;
        uint plantCount;
    }
    
    //initial creator of the contract
    address public recyclingPlant;

    //each delivery is given a unique ID
    uint private deliveryId;

    //use to map the delivery ID to the specific delivery
    mapping(uint => Delivery) private deliveries;
    
    //modifies methods so they can only be called by the plant
    modifier restricted() {
        require(msg.sender == recyclingPlant, "Only plant account can modify this data");
        _;
    }
    
    //events are used to access return values
    event LogCenterDelivery(
        uint id
    );

    event Discrepancy(
        uint difference
    );
    
    event CheckDelivery(
        address center,
        uint centerBagCount,
        uint plantCount
    );
    
    //constructor function which assigns the value of the plant to the creator & initializes UID
    constructor() public {
        recyclingPlant = msg.sender;
        deliveryId = 0;
    }

    //called by centers to record a count, returns the index of that count
    function recordCount(uint newCount) public returns(uint) {
        Delivery memory newDelivery = Delivery({
            center: msg.sender,
            bagCount: newCount,
            plantCount: 0
        });
        deliveryId++;
        deliveries[deliveryId] = newDelivery;
        emit LogCenterDelivery(deliveryId);
        return deliveryId;
    }
    
    //plant can verify a delivery
    function verifyDelivery(uint requestedId, uint verifiedCount) public restricted returns(uint) {
        Delivery storage delivery = deliveries[requestedId];
        uint centerCount = delivery.bagCount;
        delivery.plantCount = verifiedCount;
        if (verifiedCount > centerCount) {
            emit Discrepancy(verifiedCount - centerCount);
        } else {
            emit Discrepancy(delivery.bagCount - centerCount);
        }
        return verifiedCount - delivery.bagCount;
    }
    
    //calls a specific recorded delivery - can only be viewed accurately after both parties have submitted their count
    function getDelivery(uint requestedId) public returns (address, uint, uint) {
        Delivery storage delivery = deliveries[requestedId];
        if (delivery.plantCount != 0) {
            emit CheckDelivery(delivery.center, delivery.bagCount, delivery.plantCount);
            return (delivery.center, delivery.bagCount, delivery.plantCount);
        }
        else {
            emit CheckDelivery(delivery.center, delivery.bagCount, delivery.plantCount);
            return (delivery.center,0,0);
        }
    } 
}