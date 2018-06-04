module.exports = {
    async get(req,res,next){        
        console.log(`Hello............ES6 Trials Start`);

        try {        
            //listTrials();
            mapAndsets();

            res.status(200).send('Ok');
            console.log(`Hello............ES6 Trials End`);
        } catch (error) {
            console.error(error);
            console.log(`Hello............ES6 Trials Error`);
            res.status(200).send(error.stack);
        }
        
        next();
    }

}

//region/////////// Symbol search /////////////////

function es6SymbolsTest(params) {
    class Product{
        constructor (type) {
           this.type = type;        
        }
        [Symbol.search](string){
            return string.indexOf(this.type) >= 0 ? 'FOUND': 'NOT_FOUND';
        }
        
    };

    let soapObj = new Product('soap');

    console.log('Barsoap'.search(soapObj)); //FOUND
    console.log('shampoo'.search(soapObj)); //NOT_FOUND



}
//endregion /////////////////////// Symbol search //////////////////
//region /// start your own Ireators and Iterables ////////////////////////
function es6IterablesTest(params) {
    
    class Users{
        constructor(users) {
            this.users=users ;
        }

        ///Have a symbol iterator that stores a property that stores a method
        [Symbol.iterator](){
            let i = 0 ;
            let users = this.users;

            //this returned object is called an iterator
            return {
                next() {
                    if( i < users.length){
                        return {done:false , value: users[i++] }
                    }

                    return {done:true};
                }
            };
        }
    }

    //allUsers is called an iterable
    const allUsersX= new Users([
        {name:'aaaa'},
        {name:'bbbb'},
        {name:'cccc'}
    ]);

    const allUsersIterator = allUsersX[Symbol.iterator]();

    //using in the for of loop
    for(let u of allUsersX){
        console.log(`${u.name}`);
    }

    //or now you could use the spread operators
    console.log([...allUsersX]);




}





//endregion //end your own Ireators and Iterables ////////////////////////
// region ///////// Start Genrators ////////////////////////

function es6GeneratorsTest(bucketsParam) {
    // return new Promise((resolve,reject)=>{
        
        class Buckets{
            constructor(buckets) {
                this.buckets=buckets ;
                this.len = buckets.length ;            
            }
    
            *getIterator(){
                for(let i in this.buckets){ 
                    console.log(`iiiiiiiiiii=> ${this.buckets[i].Name}`);               
                    yield this.buckets[i];  // Although inside loop yield only runs once and then returns to calling function
                    }
            }
    
        }
    
    
        const allUsers= new Buckets(bucketsParam)
    
        const allUsersIterator = allUsers.getIterator();
    
        // console.log(allUsersIterator.next()); //next method returns the next yielded value;
        // console.log(allUsersIterator.next());
        // console.log(allUsersIterator.next());
        // console.log(allUsersIterator.next());
    
        //in a for of loop
        for(let u of allUsersIterator){
            console.log(`${u.Name}`);
        }
    
        // //Using the spread operator
        // console.log(`${[...allUsersIterator]}`);

    //     return resolve('done...')



    // })

    



}

//endregion //////n
// region ///////// Async Generators ////////////////////////


// async function testAsyncGenerators(promises) {
//     for await(let p of promises){
//         console.log(p);
//     }
// }

// function es6AsyncGeneratorsTest(params) {    
//     const promises=[new Promise(resolve=>console.log('1111111111')),
//                     new Promise(resolve=>console.log('22222222')) ,
//                     new Promise(resolve=>console.log('333333333'))
//                     ];

//     testAsyncGenerators(promises);
// }

// endregion
// region ///////// List & other javascript operations like map , set  ////////////////////////

function listTrials(params) {
    
    /// Filter
    const studentsAge= [17, 16, 18, 19, 21, 17];
    const ableToDrink = studentsAge.filter(age => age > 18 );
    ableToDrink.forEach(x=> console.log(x));

    ///Map
    const numbers = [2,3,4,5];
    const dollars = numbers.map((n) => {
        return '$' + n;
    });
    
    dollars.forEach(x=>console.log(x));

    //Reduce
    const nums = [5, 10, 15];
    let initialValue = 20 ;
    const total = nums.reduce(function(accumulator, currentValue, currentIndex, array){
        return accumulator + currentValue;
    },initialValue);
    console.log(`Total is ${total}`);

    initialValue = 0;
    var sum = [{x: 1}, {x:2}, {x:3}].reduce(
        (accumulator, currentValue) => accumulator + currentValue.x
        ,initialValue
    );
    
    console.log(sum) // logs 6

    // Flatten an array of arrays

    var flattened = [[0,1],[2,3],[4,5]].reduce((prevVal,currentVal)=>{
        return prevVal.concat(currentVal);
    });
    console.log(flattened);

    //Counting instances of values in an object
    let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
    initialValue = {};
    let countedNames = names.reduce(function (prevVal,currentVal) {
        if(currentVal in prevVal){
            prevVal[currentVal]++;

        }else{
            prevVal[currentVal]=1;
        }

        return prevVal;
        
    },initialValue);

    console.log(`Counted Names : ${JSON.stringify(countedNames)}`);

    ///Some example
    const userPrivileges = ['user', 'user', 'user', 'admin'];
    const containsAdmin = userPrivileges.some( element => element === 'admin1');

    console.log(`containsAdmin = ${containsAdmin}`);

    // every example
    //Check if all ratings are equal to or greater than 3 stars.
    const ratings = [3, 5, 4, 3, 5];
    const goodOverallRating = ratings.every((movieRating) => {
        return movieRating >= 3 ;
    })
    console.log(`goodOverallRating more than >= 3 ${goodOverallRating}`);

    //Object.values() method returns an array of a given object's own enumerable property values

    const object1 = {
        a: 'somestring',
        b: 42,
        c: false
      };

      console.log(Object.values(object1));
      
    
    ///Array Spreading
    const arrOne= [1,2,3,4];
    const arrTwo = [5,6,7,8];
    const combinedArr = [...arrOne,...arrTwo];
    console.info(combinedArr);

    /// Object spreading 
    const spreadableObject = {
        name: 'Robert',
        phone: 'iPhone'
      };
    
    const newObject = {
    ...spreadableObject,
    carModel: 'Volkswagen'
    }

    console.log(`${JSON.stringify(newObject)}`);






}

function mapAndsets(params) {
    
    var myMap = new Map();
    var keystring = 'a string' ,
        keyObject = {}, 
        keyFunc= function(){};

    myMap.set(keystring,'zzzzzzz keystring');
    myMap.set(keyObject, 'value associated with Key Obj');
    myMap.set(keyFunc,'value associated with keyFunc');

    console.log(myMap.size); // 3

    //getting the values 
    console.log(myMap.get('a string')); // "value associated with 'a string'"
                                        // because keyString === 'a string'

    console.log(myMap.get({})) // undefined, because keyObj !== {}
    
    myMap.get(function() {}) // undefined, because keyFunc !== function () {}

    //Iteration on Maps
    var myMap2 = new Map();
    myMap2.set(0,'zero');
    myMap2.set(1,'one');
    myMap2.set(2,'two');
    myMap2.set(3,'three');
    myMap2.set(4,'four');
    myMap2.set(5,'five');

    for (const iterator of myMap2.keys()) {
        console.log(`${iterator}`);
    }

    for (const [key,value] of myMap2.entries()) {

        console.log(`key = ${key} and value = ${value}`);
    }

    
}


// endregion