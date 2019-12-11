
//example data for testing, should be replaced with actual databse later
var data = {
    money: 1000,
    projects:[
        {
            name: "Dig!",
            deadline: new Date(),
            value: 1000,
            progress: 0,
            pid: 0,

        },
        {
            name: "Dig Deeper!",
            deadline: new Date(),
            value: 1000,
            progress: 0,
            pid: 1

        }
    ],
    tasks:[
        {
            name: "nothing",
            type: "cha",
            progress: -1,
            pid: -1,
            tid: -1
           
        },
        {
            name: "Buy more shovels",
            type: "cha",
            progress: 0,
            assignees: [],
            tid: 0,
            pid: 1,

        },
        {
            name: "Actually dig deeper",
            type: "str",
            progress: 0,
            pid: 1,
            tid: 1
        },
        {
            name: "buy shovels",
            type: "cha",
            progress: 0,
            pid: 0,
            tid: 2
        },
        {
            name: "Actually dig",
            type: "str",
            progress: 0,
            pid: 0,
            tid: 3
        },
       
    ],

    employees:[
        {
            name: "Max Wisenfool",
            desc: "A fun loving wise guy",
            wage: 10,
            str: 5,
            int: 10,
            cha: 7,
            eid: 0,
            morale: 0,
            tid: -1,
            gid: -1
        },
        {
            name: "Big strongarm",
            desc: "A big guy who likes bugs",
            wage: 10,
            str: 10,
            int: 5,
            cha: 7,
            eid: 1,
            morale: 0,
            tid: -1,
            gid: -1
        },
        {
            name: "Alexa",
            desc: "A robotic speaker that listens to everything",
            wage: 10,
            str: 5,
            int: 7,
            cha: 10,
            eid: 2,
            morale: 0,
            tid: -1,
            gid: -1
        },
        {
            name: "Lily Price",
            desc: "A great writer that loves movies",
            wage: 10,
            str: 7,
            int: 5,
            cha: 10,
            eid: 3,
            morale: 0,
            tid: -1,
            gid: -1
        },
    ],

   

    groups:[
        {
            name: "nothing",
            gid: -1
           
        },
    ],

    maxGid: 0,


    projectProposals: [
        {
            name: "Dig Even Deeper!",
            deadline: new Date(),
            value: 1000,
            progress: 0,
            tasks:[
                {
                    name: "Buy even more shovels",
                    type: "cha",
                    progress: 0,
                    assignees: []
                },
                {
                    name: "Actually dig even deeper",
                    type: "str",
                    progress: 0,
                    assignees: []
                }
            ]

        }
    ],
    applicants: [
        {
            name: "Anna Dixon",
            desc: "An aspiring teacher who loves children"
        }
    ]
   



}
//update
function generateProject(){
    //todo
}

function generateEmployee(){
    //todo
}


var tick = 0

//gotta use primary keys and stuff in here
window.setInterval(()=>{
    let assignedEids = []
    for (let p of data.projects){
        //reset to 0 to prevent accumulation
        p.progress = 0
        for (let t of data.tasks){
            for (let e of data.employees){
                if (e.tid == t.tid){
                    t.progress += e[t.type]
                }
               
                
                
            }
            //p.progress is the sum of the task progressses
            if (t.pid == p.pid){
                p.progress += t.progress
            }
           
        }
        
    }
    //morale update
    for (let e of data.employees){
        if (e.tid != -1){
            e.morale += (e.wage - 11)
        }
        data.money -= e.wage
       
    }
    tick += 1
    if (tick % 60 == 0){

    }
   
}, 1000)

export default data;