// هذا التابع باختصار يقوم بأخذ كل بيانات فورم اضافة اعلان ويقوم بتحوله واستخلاص منه بيانات متناسقة نظيفة لكي اخزنها في الباك إند
// هذا التابع أشبه بالمخرطة حيث يقوم بخرط اوبجكت الداتا وتنظيفه وفرزه وتهيئته لارساله للباك
function convertNewAdData(data) {
  const user = JSON.parse(localStorage.getItem("user"));
  let user_id = user != null ? user.id : 1;

  const contactNumber = {
    firstName: data.contactName1,
    firstPhone: `${data.phoneCode1}${data.phone1}`,
  };

  if (
    data.contactName2 !== "" &&
    data.contactName2 !== null &&
    data.contactName2 !== undefined
  ) {
    contactNumber.secondName = data.contactName2;
    contactNumber.secondPhone = `${data.phoneCode2}${data.phone2}`;
  }

  const advertisement = {
    user_id: user_id,
    address: JSON.stringify({
      country: data.country,
      city: data.city,
    }),
    title: data.title,
    description: data.description,
    contactNumber: JSON.stringify(contactNumber),
  };

  if (data.locationLatitude != null && data.locationLongitude != null) {
    advertisement.location = JSON.stringify({
      latitude: data.locationLatitude,
      longitude: data.locationLongitude,
    });
  }

  const photoes = data.photoes.filter((photo) => photo !== undefined);
  const filterFields = {};

  if (data.category === "RealEstates") {
    advertisement.category = data.subCategory;

    if (data.subCategory === "Apartment") {
      filterFields.area = data.area;
      filterFields.floor = data.floor;
      filterFields.roomCount = data.roomCount;
      filterFields.cladding = data.cladding;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      filterFields.direction = data.direction;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    } else if (data.subCategory === "Office") {
      filterFields.area = data.area;
      filterFields.floor = data.floor;
      filterFields.roomCount = data.roomCount;
      filterFields.cladding = data.cladding;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      filterFields.direction = data.direction;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    } else if (data.subCategory === "Villa") {
      filterFields.area = data.area;
      filterFields.roomCount = data.roomCount;
      filterFields.cladding = data.cladding;
      filterFields.floorsCount = data.floorsCount;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      filterFields.direction = data.direction;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    } else if (data.subCategory === "Store") {
      filterFields.area = data.area;
      filterFields.floor = data.floor;
      filterFields.cladding = data.cladding;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    } else if (data.subCategory === "Land") {
      filterFields.area = data.area;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    } else if (data.subCategory === "Farm") {
      filterFields.area = data.area;
      filterFields.roomCount = data.roomCount;
      filterFields.cladding = data.cladding;
      filterFields.floorsCount = data.floorsCount;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      filterFields.direction = data.direction;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    } else if (data.subCategory === "Chalet") {
      filterFields.area = data.area;
      filterFields.floor = data.floor;
      filterFields.roomCount = data.roomCount;
      filterFields.cladding = data.cladding;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    }
  } else if (data.category === "vehicles") {
    advertisement.category = data.subCategory;
    if (data.subCategory === "Spare parts") {
      filterFields.vehicleType = data.vehicleType;
      filterFields.status = data.SparePartStatus;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
    } else {
      filterFields.brand = data.vehicleBrand;
      filterFields.model = data.vehicleModel;
      filterFields.color = data.vehicleColor;
      filterFields.gear = data.gear;
      filterFields.manufactureYear = data.manufactureYear;
      filterFields.traveledDistance = data.traveledDistance;
      filterFields.engineCapacity = data.engineCapacity;
      filterFields.fuel = data.fuel;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.paintStatus = data.paintStatus;
      filterFields.sellOrRent = data.sellOrRent;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    }
  } else if (data.category === "Devices") {
    advertisement.category = data.subCategory;
    if (data.subCategory === "Mobile" || data.subCategory === "Tablet") {
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.brand = data.mobOrTabBrand;
      filterFields.category = data.mobOrTabCategory;
      filterFields.ram = data.mobOrTabRam;
      filterFields.hard = data.mobOrTabHard;
      filterFields.status = data.deviceStatus;
      filterFields.batteryStatus = data.batteryStatus;
    } else if (data.subCategory === "Computer") {
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.brand = data.computerBrand;
      filterFields.category = data.computerCategory;
      filterFields.ram = data.computerRam;
      filterFields.hard = data.computerHard;
      filterFields.processor = data.processor;
      filterFields.status = data.deviceStatus;
      filterFields.screenType = data.screenType;
      filterFields.screenSize = data.screenSize;
    } else if (data.subCategory === "Accessories") {
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.deviceType = data.deviceType;
    } else {
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.status = data.deviceStatus;
    }
  } else if (data.category === "Furniture") {
    advertisement.category = data.subCategory;
    filterFields.material = data.material;
    filterFields.price = data.price;
    filterFields.currency = data.currency;
    filterFields.status = data.furnitureStatus;
  } else if (data.category === "Clothing and fashion") {
    advertisement.category = data.subCategory;
    filterFields.price = data.price;
    filterFields.currency = data.currency;
    filterFields.status = data.clothesStatus;
    filterFields.type = data.clothesType;
  } else if (
    data.category === "Animals" ||
    data.category === "Personal Collections" ||
    data.category === "Food and drinks" ||
    data.category === "Books and hobbies"
  ) {
    advertisement.category = data.subCategory;
    filterFields.price = data.price;
    filterFields.currency = data.currency;
  } else if (
    data.category === "Children equipment" ||
    data.category === "Sports and clubs" ||
    data.category === "Industrial equipment"
  ) {
    advertisement.category = data.category;
    filterFields.price = data.price;
    filterFields.currency = data.currency;
  } else if (data.category === "Services" || data.category === "Jobs") {
    advertisement.category = data.category;
  }

  return { advertisement, filterFields, photoes };
}

function convertFilterData(data) {
  const filterObject = {};
  filterObject.country = data.country;
  filterObject.city = data.city;

  if (data.category === "RealEstates") {
    filterObject.sellOrRent = data.sellOrRent;
    filterObject.category = data.subCategory;
    if (data.subCategory === "Apartment") {
      filterObject.areaFrom = data.areaFrom;
      filterObject.areaTo = data.areaTo;

      filterObject.ownership = data.ownership;

      filterObject.priceFrom = data.priceFrom;
      filterObject.priceTo = data.priceTo;
      filterObject.currency = data.currency;
      filterObject.direction = data.direction;
      filterObject.roomCount = data.roomCount;
      filterObject.floor = data.floor;
      filterObject.cladding = data.cladding;
    }
    if (data.subCategory === "Farm") {
      filterObject.areaFrom = data.areaFrom;
      filterObject.areaTo = data.areaTo;

      filterObject.ownership = data.ownership;

      filterObject.priceFrom = data.priceFrom;
      filterObject.priceTo = data.priceTo;
      filterObject.currency = data.currency;
      filterObject.direction = data.direction;
      filterObject.roomCount = data.roomCount;
      filterObject.floorsCount = data.floorsCount;
      filterObject.cladding = data.cladding;
    }
    if (data.subCategory === "Land") {
      filterObject.areaFrom = data.areaFrom;
      filterObject.areaTo = data.areaTo;

      filterObject.ownership = data.ownership;

      filterObject.priceFrom = data.priceFrom;
      filterObject.priceTo = data.priceTo;
      filterObject.currency = data.currency;
    }
    if (data.subCategory === "Store") {
      filterObject.areaFrom = data.areaFrom;
      filterObject.areaTo = data.areaTo;

      filterObject.ownership = data.ownership;

      filterObject.priceFrom = data.priceFrom;
      filterObject.priceTo = data.priceTo;
      filterObject.currency = data.currency;
      filterObject.floor = data.floor;
      filterObject.cladding = data.cladding;
    }
    if (data.subCategory === "Office") {
      filterObject.areaFrom = data.areaFrom;
      filterObject.areaTo = data.areaTo;

      filterObject.ownership = data.ownership;

      filterObject.priceFrom = data.priceFrom;
      filterObject.priceTo = data.priceTo;
      filterObject.currency = data.currency;
      filterObject.direction = data.direction;
      filterObject.floor = data.floor;
      filterObject.roomCount = data.roomCount;
      filterObject.cladding = data.cladding;
    }
    if (data.subCategory === "Chalet") {
      filterObject.areaFrom = data.areaFrom;
      filterObject.areaTo = data.areaTo;

      filterObject.ownership = data.ownership;

      filterObject.priceFrom = data.priceFrom;
      filterObject.priceTo = data.priceTo;
      filterObject.currency = data.currency;

      filterObject.floor = data.floor;
      filterObject.roomCount = data.roomCount;
      filterObject.cladding = data.cladding;
    }
    if (data.subCategory === "Villa") {
      filterObject.areaFrom = data.areaFrom;
      filterObject.areaTo = data.areaTo;

      filterObject.ownership = data.ownership;

      filterObject.priceFrom = data.priceFrom;
      filterObject.priceTo = data.priceTo;
      filterObject.currency = data.currency;

      filterObject.direction = data.direction;
      filterObject.floorsCount = data.floorsCount;
      filterObject.roomCount = data.roomCount;
      filterObject.cladding = data.cladding;
    }
  }
  if (data.category === "vehicles") {
    filterObject.category = data.subCategory;
    if (
      [
        "Car",
        "Motorcycle",
        "Truck",
        "Bus",
        "Jabala",
        "Crane",
        "Bulldozer",
      ].includes(data.subCategory)
    ) {
      filterObject.sellOrRent = data.sellOrRent;
      filterObject.vehicleBrand = data.vehicleBrand;
      filterObject.vehicleModel = data.vehicleModel;
      filterObject.paintStatus = data.paintStatus;
      filterObject.vehicleColor = data.vehicleColor;
      filterObject.gear = data.gear;
      filterObject.fuel = data.fuel;
      filterObject.priceFrom = data.priceFrom;
      filterObject.priceTo = data.priceTo;
      filterObject.currency = data.currency;
    } else if (data.subCategory === "Spare parts") {
      filterObject.sparePartVehicleType = data.sparePartVehicleType;
      filterObject.sparePartStatus = data.sparePartStatus;
      filterObject.priceFrom = data.priceFrom;
      filterObject.priceTo = data.priceTo;
      filterObject.currency = data.currency;
    }
  }
  if (data.category === "Devices") {
    filterObject.category = data.subCategory;
    filterObject.priceFrom = data.priceFrom;
    filterObject.priceTo = data.priceTo;
    filterObject.currency = data.currency;
    if (data.subCategory === "Mobile" || data.subCategory === "Tablet") {
      filterObject.mobOrTabBrand = data.mobOrTabBrand;
      filterObject.mobOrTabCategory = data.mobOrTabCategory;
      filterObject.deviceStatus = data.deviceStatus;
      filterObject.batteryStatus = data.batteryStatus;
    }
    if (data.subCategory === "Computer") {
      filterObject.computerBrand = data.computerBrand;
      filterObject.computerCategory = data.computerCategory;
      filterObject.deviceStatus = data.deviceStatus;
      filterObject.processor = data.processor;
      filterObject.screenType = data.screenType;
      filterObject.screenSize = data.screenSize;
    }
    if (data.subCategory === "Accessories") {
      filterObject.accessoriesDeviceType = data.accessoriesDeviceType;
    }
    if (
      [
        "Refrigerator",
        "Washing Machine",
        "Fan",
        "Heater",
        "Blenders juicers",
        "Oven Microwave",
        "Screen",
        "Receiver",
        "Solar Energy",
      ].includes(data.subCategory)
    ) {
      filterObject.deviceStatus = data.deviceStatus;
    }
  }
  if (data.category === "Furniture") {
    filterObject.category = data.subCategory;
    filterObject.priceFrom = data.priceFrom;
    filterObject.priceTo = data.priceTo;
    filterObject.currency = data.currency;
    filterObject.material = data.material;
    filterObject.furnitureStatus = data.furnitureStatus;
  }
  if (data.category === "Clothing and fashion") {
    filterObject.category = data.subCategory;
    filterObject.priceFrom = data.priceFrom;
    filterObject.priceTo = data.priceTo;
    filterObject.currency = data.currency;
    filterObject.clothesType = data.clothesType;
    filterObject.clothesStatus = data.clothesStatus;
  }
  if (data.category === "Animals") {
    filterObject.category = data.subCategory;
    filterObject.priceFrom = data.priceFrom;
    filterObject.priceTo = data.priceTo;
    filterObject.currency = data.currency;
  }
  if (data.category === "Personal Collections") {
    filterObject.category = data.subCategory;
    filterObject.priceFrom = data.priceFrom;
    filterObject.priceTo = data.priceTo;
    filterObject.currency = data.currency;
  }
  if (data.category === "Food and drinks") {
    filterObject.category = data.subCategory;
    filterObject.priceFrom = data.priceFrom;
    filterObject.priceTo = data.priceTo;
    filterObject.currency = data.currency;
  }
  if (data.category === "Books and hobbies") {
    filterObject.category = data.subCategory;
    filterObject.priceFrom = data.priceFrom;
    filterObject.priceTo = data.priceTo;
    filterObject.currency = data.currency;
  }
  if (data.category === "Children equipment") {
    filterObject.category = data.category;
    filterObject.priceFrom = data.priceFrom;
    filterObject.priceTo = data.priceTo;
    filterObject.currency = data.currency;
  }
  if (data.category === "Sports and clubs") {
    filterObject.category = data.category;
    filterObject.priceFrom = data.priceFrom;
    filterObject.priceTo = data.priceTo;
    filterObject.currency = data.currency;
  }
  if (data.category === "Industrial equipment") {
    filterObject.category = data.category;
    filterObject.priceFrom = data.priceFrom;
    filterObject.priceTo = data.priceTo;
    filterObject.currency = data.currency;
  }
  if (data.category === "Jobs") {
    filterObject.category = data.category;
  }
  if (data.category === "Services") {
    filterObject.category = data.category;
  }

  // remove all key that have null values
  const filteredObject = Object.fromEntries(
    Object.entries(filterObject).filter(([key, value]) => value !== null)
  );

  return filteredObject;
}

export { convertNewAdData, convertFilterData };
