// const person = {
//     name: "Maxim",
//     age: 25,
//     greet: function () {
//         console.log("Greet")
//     }
// }

// Прототип - это определенный объект который присутствует у родительский элементов по стандарту.



const person = new Object({
    name: "Maxim",
    age: 25,
    greet: function () {
        console.log("Greet")
    }
})

Object.prototype.sayHello = function () {
    console.log("Hello")
}

// В прототип мы можем передать объект с помощью метода Object.create(),
// и этот объект будет являться прототипом главного объекта

const lena = Object.create(person)

srt = "String"
str = new String("I am string")