import {observable,autorun} from 'mobx';

let message = observable({
    title: "Foo",
    author: {
        name: "Michel"
    },
    likes: [
        "John", "Sara"
    ]
})

autorun(()=>{
    console.log(message.title)
})

message.title = 'Goo';

message = {
    title:'Hoo'
}

message = observable({
    title:'Ioo'
})