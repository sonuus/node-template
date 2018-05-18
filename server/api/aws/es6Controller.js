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

/// start your own Ireators and Iterables ////////////////////////
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





// end your own Ireators and Iterables ////////////////////////


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

// endregion


// region ///////// Async Generators ////////////////////////


async function testAsyncGenerators(promises) {
    for await(let p of promises){
        console.log(p);
    }
}

function es6AsyncGeneratorsTest(params) {    
    const promises=[new Promise(resolve=>console.log('1111111111')),
                    new Promise(resolve=>console.log('22222222')) ,
                    new Promise(resolve=>console.log('333333333'))
                    ];

    testAsyncGenerators(promises);
}

// endregion
