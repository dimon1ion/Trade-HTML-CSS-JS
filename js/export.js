class Category {
    nameCategory;
    childCategory;
    constructor(name, childCategory) {
        this.nameCategory = name;
        if (childCategory instanceof Category) {
            this.childCategory = childCategory;
        } else {
            this.childCategory = null;
        }
    }

    Copy(obj) {
        for (var prop in obj) {
            if (
                prop == "childCategory" &&
                (obj[prop] != null || obj[prop] != undefined)
            ) {
                this[prop] = new Category().Copy(obj[prop]);
                continue;
            }
            this[prop] = obj[prop];
        }
        return this;
    }

    childCategories() {
        if (this.childCategory != null || this.childCategory != undefined) {
            return [
                this.childCategory.nameCategory,
                ...this.childCategory?.childCategories(),
            ];
        }
        return [];
    }

    static searchValue(category, value) {
        return category?.nameCategory?.toString().search(value) != -1 || (category?.childCategory != null && category?.childCategory != undefined ? this.searchValue(category?.childCategory, value) : false);
    }

}

class Product {
    name;
    location;
    used;
    price;
    negotiable;
    category;
    time;
    verified;
    posted;
    image;
    constructor(
        name,
        location,
        used,
        price,
        negotiable,
        category,
        time,
        verified,
        posted,
        image
    ) {
        this.name = name;
        this.location = location;
        this.used = used;
        this.price = price;
        this.negotiable = negotiable;
        if (category instanceof Category) {
            this.category = category;
        } else {
            this.category = null;
        }
        this.time = time;
        this.verified = verified;
        this.posted = posted;
        this.image = image;
    }

    Copy(obj) {
        // obj && Object.assign(this,obj);
        for (var prop in this) {
            if (obj[prop] === undefined) {
                return undefined;
            }
            if (prop == "category" && (obj[prop] != null || obj[prop] != undefined)) {
                this[prop] = new Category().Copy(obj[prop]);
                continue;
            } else if (prop == "time") {
                this[prop] = new Date(obj[prop]);
                continue;
            }
            this[prop] = obj[prop];
        }
        return this;
    }

    //   constructor(obj){
    //       obj && Object.assign(this,obj);
    //   }
}

class QueryParam {
    key;
    value;
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

let products = [
    new Product(
        "Samsung Galaxy S6 Edge",
        "Russia",
        true,
        380.00,
        true,
        new Category("Electrics & Gedgets", new Category("Mobile Phones", null)),
        new Date(),
        true,
        1,
        "/data/images/phone.jpg"
    ),
    new Product(
        "Samsung Galaxy S6 Edge",
        "Russia",
        true,
        380.00,
        true,
        new Category("Electrics & Gedgets", new Category("Mobile Phones", null)),
        new Date(),
        true,
        2,
        "/data/images/phone.jpg"
    ),
    new Product(
        "Samsung Galaxy S6 Edge",
        "Russia",
        true,
        380.00,
        true,
        new Category("Electrics & Gedgets", new Category("Mobile Phones", null)),
        new Date(),
        true,
        1,
        "/data/images/phone.jpg"
    ),
    new Product(
        "Samsung Galaxy S6 Edge",
        "Russia",
        true,
        380.00,
        true,
        new Category("Electrics & Gedgets", new Category("Mobile Phones", null)),
        new Date(),
        true,
        2,
        "/data/images/phone.jpg"
    ),
    new Product(
        "Samsung Galaxy S6 Edge",
        "Russia",
        true,
        380.00,
        true,
        new Category("Electrics & Gedgets", new Category("Mobile Phones", null)),
        new Date(),
        true,
        1,
        "/data/images/phone.jpg"
    ),
    new Product(
        "Samsung Galaxy S6 Edge",
        "Russia",
        true,
        380.00,
        true,
        new Category("Electrics & Gedgets", new Category("Mobile Phones", null)),
        new Date(),
        true,
        1,
        "/data/images/phone.jpg"
    ),
    new Product(
        "Samsung Galaxy S6 Edge",
        "Russia",
        true,
        380.00,
        true,
        new Category("Electrics & Gedgets", new Category("Mobile Phones", null)),
        new Date(),
        true,
        1,
        "/data/images/phone.jpg"
    ),
    new Product(
        "Samsung Galaxy S6 Edge",
        "Russia",
        true,
        380.00,
        true,
        new Category("Electrics & Gedgets", new Category("Mobile Phones", null)),
        new Date(),
        true,
        1,
        "/data/images/phone.jpg"
    ),
    new Product(
        "Samsung Galaxy S6 Edge",
        "Russia",
        true,
        380.00,
        true,
        new Category("Electrics & Gedgets", new Category("Mobile Phones", null)),
        new Date(),
        true,
        2,
        "/data/images/phone.jpg"
    ),
    new Product(
        "Samsung Galaxy S6 Edge",
        "Russia",
        true,
        380.00,
        true,
        new Category("Electrics & Gedgets", new Category("Mobile Phones", null)),
        new Date(),
        true,
        1,
        "/data/images/phone.jpg"
    ),
    new Product(
        "Samsung Galaxy S6 Edge",
        "Russia",
        true,
        380.00,
        true,
        new Category("Electrics & Gedgets", new Category("Mobile Phones", null)),
        new Date(),
        true,
        2,
        "/data/images/phone.jpg"
    ),
];

console.log(JSON.stringify(products));