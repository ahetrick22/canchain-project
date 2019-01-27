pragma solidity>=0.4.25;

contract BagCount {
    
    //used to record a delivery
    struct Delivery {
        address center;
        address plant;
        uint bagCount;
        uint plantCount;
        uint centerDt;
        uint plantDt;
        uint centerBn;
        uint plantBn;
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
    
    //events are used to access return values in Drizzle
    event LogCenterDelivery(
        uint id
    );

    event Discrepancy(
        uint difference
    );
    
    event CheckDelivery(
        address center,
        address plant,
        uint centerBagCount,
        uint plantCount,
        uint centerDt,
        uint plantDt,
        uint centerBn,
        uint plantBn
    );
    
    //constructor function which assigns the value of the plant to the creator & initializes UID
    constructor() public {
        recyclingPlant = msg.sender;
        deliveryId = 0;
    }

    //called by centers to record a count, returns the index of that count (contract_id)
    function recordCount(uint newCount) public returns(uint) {
        Delivery memory newDelivery = Delivery({
            center: msg.sender,
            plant: msg.sender,
            bagCount: newCount,
            plantCount: 0,
            centerDt: now,
            plantDt: 0,
            centerBn: block.number,
            plantBn: 0
        });
        deliveryId++;
        deliveries[deliveryId] = newDelivery;
        emit LogCenterDelivery(deliveryId);
        return deliveryId;
    }
    
    //plant can verify a delivery, which returns the discrepancy to be recorded in the DB
    function verifyDelivery(uint requestedId, uint verifiedCount) public restricted returns(uint) {
        Delivery storage delivery = deliveries[requestedId];
        uint centerCount = delivery.bagCount;
        delivery.plantCount = verifiedCount;
        delivery.plant = msg.sender;
        delivery.plantDt = now;
        delivery.plantBn = block.number;
        if (verifiedCount > centerCount) {
            emit Discrepancy(verifiedCount - centerCount);
            return verifiedCount - centerCount;
        } else {
            emit Discrepancy(centerCount - verifiedCount);
            return centerCount - verifiedCount;
        }
    }
    
    //calls a specific recorded delivery - can only be viewed accurately after both parties have submitted their count
    function getDelivery(uint requestedId) public returns (address, address, uint, uint, uint, uint, uint, uint) {
        Delivery storage d = deliveries[requestedId];
        emit CheckDelivery(d.center,d.plant,d.bagCount,d.plantCount,d.centerDt,d.plantDt,d.centerBn,d.plantBn);
        return (d.center,d.plant,d.bagCount,d.plantCount,d.centerDt,d.plantDt,d.centerBn,d.plantBn);
    } 
}

