
//example data for testing, should be replaced with actual databse later
var data = {
    money: 1000,
    projects:[
        {
            name: "Dig!",
            deadline: new Date(),
            value: 1000,
            progress: 0,
            tasks:[
                {
                    name: "buy shovels",
                    type: "cha",
                    progress: 0,
                    assignees: []
                },
                {
                    name: "Actually dig",
                    type: "str",
                    progress: 0,
                    assignees: []
                }
            ]

        },
        {
            name: "Dig Deeper!",
            deadline: new Date(),
            value: 1000,
            progress: 0,
            tasks:[
                {
                    name: "Buy more shovels",
                    type: "cha",
                    progress: 0,
                    assignees: []
                },
                {
                    name: "Actually dig deeper",
                    type: "str",
                    progress: 0,
                    assignees: []
                }
            ]

        }
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
        },
    ],

    noTask:{
        name: "nothing",
        type: "cha",
        progress: -1,
        assignees: []
    },

    groups:[

    ],

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
        for (let t of p.tasks){
            for (let e of t.assignees){
                t.progress += e[t.type]
                data.money -= e.wage
                assignedEids.push(e.eid)
                
            }
            //p.progress is the sum of the task progressses
            p.progress += t.progress
        }
        
    }
    //morale update
    for (let e of data.employees){
        if (e.eid in assignedEids){
            e.morale += (e.wage - 11)
        }
       
    }
    tick += 1
    if (tick % 60 == 0){

    }
   
}, 1000)

export default data;