// 原型
function foo(a, b) {
    return a * b;
}
console.log(foo.length); // 2
console.log(foo.constructor); // [Function: Function]
console.log(typeof foo.prototype); // object


// 利用原型添加方法与属性
function Gadget(name, color) {
    this.name = name;
    this.color = color;
    this.whatAreYou = function () {
        return 'I am a ' + this.color + ' ' + this.name;
    }
}

// 通过构造器来添加属性和方法  注意 必须是构造器时候，原型才可以有效
// 一个一个添加
// Gadget.prototype.price = 100;
// Gadget.prototype.rating = 100;
// Gadget.prototype.getInfo = function () {
//     return 'Rating:' + this.rating + ', price:' + this.price;
// };

// 可以定义为一个对象，一起加入
Gadget.prototype = {
    price: 100,
    rating: 3,
    getInfo: function () {
        return 'Rating:' + this.rating + ', price:' + this.price;
    }
};

var newtoy = new Gadget('wangYong', 'yellow');
console.log(newtoy.name); // wangYong
console.log(newtoy.color); // yellow
console.log(newtoy.price); // 100
console.log(newtoy.rating); // 3
console.log(newtoy.getInfo()); // Rating:3, price:100

// 原型具有实时性live
Gadget.prototype.get=function (what) {
    // return this.what; // undefined
    return this[what];
};
console.log(newtoy.get('price')); // 100
console.log(newtoy.get('color')); // yellow