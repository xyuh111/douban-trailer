// 路由装饰器 demo
class Boy{
   @speak('中文')
   run(){
    console.log('i can run !'+ this.language)
       console.log('i can run !')
   } 
}
function speak(language){
    return function (target,key,descriptor) { 
        console.log(target)
        console.log(key)
        console.log(descriptor)
        target.language = language
        return descriptor
     }
}


// function speak(target,key,descriptor) { 
//     console.log(target)
//     console.log(key)
//     console.log(descriptor)
//     return descriptor
//  }

const luke = new Boy()

luke.run()