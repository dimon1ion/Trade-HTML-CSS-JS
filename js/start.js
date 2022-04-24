let productsRes = [];
let parameters = new URLSearchParams();
window.addEventListener("scroll", scrollUp);

function scrollUp() {
    if (+this.scrollY >= 200) {
        scrollup.classList.add("show-scrollup");
    } else {
        scrollup.classList.remove("show-scrollup");
    }
}

function openClosePresents(){
    const elem = document.querySelector("#presents");
    elem.classList.toggle("opened");
}

async function start() {
    let params = [];
    const urlparams = new URLSearchParams(location.search).entries();
    const search = new URLSearchParams(location.search);
    let count = 0;
    for (urlparam of urlparams) {
        // console.log(`key = ${urlparam[0]} value=${urlparam[1]}`);
        switch (urlparam[0]) {
            case "nameCategory":
                const headCategory = document.querySelectorAll(".headerCategory");
                for (element of headCategory) {
                    element.innerText = urlparam[1];
                }
            case "name":
            case "location":
            case "used":
            case "posted":
                params[count++] = new QueryParam(urlparam[0], urlparam[1]);
        }
    }
    await fetch("../data/Json/products.json")
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let array;
            array = JSON.parse(data, function (k, v) {
                // console.log(`key=${k} value=${v}`);
                return v;
            });
            if (array != undefined && array != null) {
                let count = 0;
                let prod;
                let falseProducts;
                let falsecount;
                let notFound = false;
                let falseindex;
                loop1: for (item of array) {
                    falseProducts = [];
                    falsecount = 0;
                    if (count < 17) {
                        if ((prod = new Product().Copy(item)) !== undefined) {
                            loop2: for (param of params) {
                                // console.log(`key=${param.key} value=${param.value}`);
                                notFound = false;
                                if (prod[param.key] != undefined) {
                                    if (prod[param.key].toString().search(param.value) == -1) {
                                        notFound = true;
                                        // continue loop1;
                                    }
                                }
                                else if (param.key == "nameCategory") {
                                    if (!Category.searchValue(prod["category"], param.value)) {
                                        notFound = true;
                                        // continue loop1;
                                    }
                                }
                                if (notFound == true) {
                                    for (fproduct of falseProducts) {
                                        if (fproduct.key == param.key) {
                                            continue loop2;
                                        }
                                    }
                                    falseProducts[falsecount] = new QueryParam(param.key, false);
                                }
                                else {
                                    for (fproduct in falseProducts) {
                                        if (falseProducts[fproduct].key == param.key) {
                                            falseProducts[fproduct].value = true;
                                            continue loop2;
                                        }
                                    }
                                    falseProducts[falsecount] = new QueryParam(param.key, true);
                                }
                            }
                            for (fproduct in falseProducts) {
                                if (falseProducts[fproduct].value == false) {
                                    continue loop1;
                                }
                            }
                            productsRes[count++] = new Product().Copy(item);
                        }
                    }
                }
            }
            GenerateProducts();
        });


}

function GenerateProducts() {
    const mainParent = document.querySelector("#product-items");
    if (mainParent != undefined && productsRes != undefined && productsRes != null) {
        mainParent.innerHTML = "";
        let count = 1;
        for (item of productsRes) {
            let parent = document.createElement("div");
            parent.classList.add("ad", "type-ads", "row");

            let categoriesHTML = "";
            // Переменные для ввода в HTML code
            let children = item.category.childCategories();
            for (child of children) {
                categoriesHTML += `/\n<a href="#">${child}</a>`;
            }

            let posted;
            switch (item.posted) {
                case 1:
                    posted = "individual"
                    break;
                case 2:
                    posted = "dealer"
                    break;
                default:
                    posted = "individual"
                    break;
            }
            let time = `${item.time.getDate()} ${item.time.toLocaleString("default", {
                month: "short",
            })},
            ${item.time.toLocaleString("default", { year: "2-digit" })}
            ${item.time
                    .toLocaleString("default", { timeStyle: "short" })
                    .toLowerCase()}`;
            let used = item.used == true ? `<a href="#" class="tags">Used</a>` : "";

            parent.innerHTML = `<div class="ad-image item-image ${item.verified ? "verified" : ""} col-12 col-lg-4">
        <img src="..${item.image}" alt="image" />
      </div>
      <div class="col">
        <div class="info">
          <h5>$${item.price} ${item.negotiable == true ? `<span>(Negotiable)</span>` : ""
                }</h5>
          <a href="#" class="product-name">${item.name}</a>
          <div class="product-categorie">
            <a href="#">${item.category.nameCategory}</a>
            ${categoriesHTML}
          </div>
        </div>
        <div class="additionally d-none w-larger">
          <div class="left-icons d-flex">
            <a href="#">${time}</a>
            ${used}
          </div>
          <div class="icons">
            <a href="#" class="nav-icon" title="${item.location}"></a>
            <a href="#" class="${posted}" title="${posted}"></a>
          </div>
        </div>
      </div>
      <div class="additionally col-12 w-smaller">
        <div class="left-icons d-flex">
          <a href="#">${time}</a>
          ${used}
        </div>
        <div class="icons">
          <a href="#" class="nav-icon" title="${item.location}"></a>
          <a href="#" class="${posted}" title="${posted}"></a>
        </div>
      </div>`;
            mainParent.appendChild(parent);
            if (count++ >= 5) {
                let ad = document.createElement("div");
                ad.classList.add("row");
                ad.innerHTML += `<div class="ad-money d-flex justify-content-center">
        <a href="https://ru.warface.com/news/1008798.html" class="d-flex" target="_blank">
          <img alt="" src="../gif/warface.gif" />
        </a>
      </div>`;
                mainParent.appendChild(ad);
                count = 1;
            }
        }
    }
}

function changeCategory(e) {
    const changeElement = document.querySelector("#categoryForChange");
    changeInnerText(e, changeElement);
}

function changeLocation(e) {
    const changeElement = document.querySelector("#locationForChange");
    changeInnerText(e, changeElement);
}

function clickSearch() {
    const category = document.querySelector("#categoryForChange");
    const location = document.querySelector("#locationForChange");
    const searchText = document.querySelector("#searchText");
    if (category != null && location != null && searchText != null) {
        if (category.innerText.trim() != "Select Category") {
            parameters.append("nameCategory", category.innerText);
        }
        if (location.innerText.trim() != "Select Location") {
            parameters.append("location", location.innerText);
        }
        if (searchText.value.trim() != "") {
            parameters.append("name", searchText.value);
        }
    }
    changelink();
}

function changeSort(e) {
    const changeElement = document.querySelector("#sortForChange");
    changeInnerText(e, changeElement);
    if (productsRes != undefined && productsRes != null) {
        switch (e.target.innerText) {
            case "Newest(low)":
                productsRes.sort(function (p1, p2) {
                    if (p1.time < p2.time) {
                        return -1
                    }
                    else if (p1.time > p2.time) {
                        return 1;
                    }
                    return 0;
                })
                GenerateProducts();
                break;
            case "Newest(hight)":
                productsRes.sort(function (p1, p2) {
                    if (p1.time < p2.time) {
                        return 1;
                    }
                    else if (p1.time > p2.time) {
                        return -1;
                    }
                    return 0;
                })
                GenerateProducts();
                break;
            case "Price(low)":
                productsRes.sort(function (p1, p2) {
                    if (p1.price < p2.price) {
                        return -1;
                    }
                    else if (p1.price > p2.price) {
                        return 1;
                    }
                    return 0;
                })
                GenerateProducts();
                break;
            case "Price(hight)":
                productsRes.sort(function (p1, p2) {
                    if (p1.price < p2.price) {
                        return -1;
                    }
                    else if (p1.price > p2.price) {
                        return 1;
                    }
                    return 0;
                })
                GenerateProducts();
                break;
            default:
                break;
        }
    }
}

function changeInnerText(e, changeElement) {
    const text = e.target.innerText;
    if (changeElement != undefined) {
        changeElement.innerText = text;
    }
}

function clickfilterInputNewUsed(e) {
    let id;
    if (e.target.attributes.getNamedItem("id").textContent == "filterNew") {
        id = "filterUsed";
    }
    else if (e.target.attributes.getNamedItem("id").textContent == "filterUsed") {
        id = "filterNew";
    }
    else {
        return;
    }
    const elem = document.querySelector(`#${id}`);
    if (elem != null) {
        elem.checked = false;
    }
}


function generateCategoryParam(e) {
    document.querySelector
    console.log(e.target.parentElement.querySelector(".category-name"));
    const elem = e.target.parentElement.querySelector(".category-name");
    if (elem != undefined) {
        parameters.append("nameCategory", elem.innerText);
        changelink();
    }
}

function changelink() {
    const filterInputCondition = document.querySelectorAll("#filterNew, #filterUsed");
    for (item of filterInputCondition) {
        if (item.checked === true) {
            parameters.append("used", (item.parentElement.innerText.trim() == "Used" ? true : false));
            break;
        }
    }
    const filterInputPostedBy = document.querySelectorAll(".postedBy");
    for (item of filterInputPostedBy) {
        if (item.checked === true) {
            let posted;
            switch (item.parentElement.innerText.trim()) {
                case "Individual":
                    posted = 1;
                    break;
                case "Dealer":
                    posted = 2;
                    break;
                default:
                    posted = 1;
                    break;
            }
            parameters.append("posted", posted);
        }
    }
    location.search = parameters.toString();
}

let prevFilter;

function closePrevFilter(e) {
    if (prevFilter != undefined && e.target != prevFilter) {
        const elem = prevFilter.parentElement.parentElement.querySelectorAll(".collapse");
        if (!prevFilter.classList.contains("collapsed")) {
            [].slice.call(elem).map(function (collapseEl) {
                return new bootstrap.Collapse(collapseEl)
            });
        }
    }
    prevFilter = e.target;
}