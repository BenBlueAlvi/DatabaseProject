

//example data for testing, should be replaced with actual databse later



var data = {
    money: 10000,
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
       
    ],

   

    groups:[
        {
            name: "nothing",
            gid: -1
           
        },
    ],

    maxGid: 0,
    maxEid: 4,
    maxPid: 2,
    maxTid: 4,


    projectProposals: [
      
    ],
    applicants: [
        {
            name: "Anna Dixon",
            desc: "An aspiring teacher who loves children",
            wage: 10,
            str: 7,
            int: 5,
            cha: 10,
            eid: 3,
            morale: 0,
            tid: -1,
            gid: -1
        }
    ],
   ready: false



}

fetch("/gameData", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      
    },
    redirect: 'follow',
    
  })
  .then((res)=>res.text())
  .then(body=>{
    
    data = JSON.parse(body);
    data.ready = true
    data.maxEid = 0
    data.maxPid = 0
    data.maxGid = 0
    data.maxTid = 0
    window.gameData = data
   console.log(window.gameData)
   
   
  })




var task_names = {
    str: [
        "Build buildings",
        "Dig",
        "Chop down trees",
        "Alienate locals",
        "Aquire resources"
    ],
    int: [
        "R&D",
        "Conduct research",
        "Prefrom experiments",
        "Create action plan",
        "Draw diagrams",
    ],
    cha:[
        "Advertise",
        "Make posters",
        "Contact investors",
        "Create social media",
        "Persuade employees"
    ],

    types: [
        "str",
        "int",
        "cha"
    ]
}

var proj_pre = [
    "Build",
    "Create",
    "Understand",
    "Generate",
    "Discover"
]

var proj_post = [
    "Wonderland",
    "Blankets",
    "Cats",
    "Portals",
    "Rubber ducks"
]

function generateTask(pid, amt){
    let task = {};
    task.Tid = window.gameData.maxTid;
    window.gameData.maxTid++;
    task.Pid = pid;
    task.type = task_names.types[getRandomInt(3)];
    task.name = task_names[task.type][getRandomInt(task_names[task.type].length)];
    task.proj_percent = 100/amt;
    return task;
  
    
}

//update
function generateProject(){
    let proj = {}
    let tasks = []
    proj.Pid = window.gameData.maxPid;
    proj.progress = 0;
   
    let amt = getRandomInt(5) + 1
    for (let i = 0; i < amt + 1; i++){
        tasks.push(generateTask(proj.Pid, amt))
    }
    proj.value = tasks.length * 1000 + getRandomInt(1000)

    window.gameData.maxPid++;
    proj.name = proj_pre[getRandomInt(proj_pre.length)] + " " + proj_post[getRandomInt(proj_post.length)]
    return [proj, tasks]
    
}

var pre_cha = [
    "An aspiring teacher",
    "An extroverted musician",
    "A business oreinted salesperson",
    "A bubbly planner",
    "A happy office worker"

]
var pre_int = [
    "An introverted researcher",
    "A fat R&D worker",
    "A curious scientist",
    "A studious computer scientist",
    "An evil genius"
]
var pre_str = [
    "An angry biker",
    "A buff construction worker",
    "A large bear wrestler",
    "A superhero",
    "An elite boxer"
]

var post_cha = [
    "loves dogs",
    "is a chatterbox"
]
var post_int = [
    "plays video games",
    "watches way too many movies"
]
var post_str = [
    "lifts weights",
    "jogs every day"
]

var first_names = [
    "Alice",
    "John",
    "Lily",
    "Greg",
    "Anna",
    "Max",
    "Haley",
    "Ben",
    "Audra",
    "Evan",
    "Berkeley",
    "James",
    "Melanie",
    "Pierre"
]

var last_names = [
    "Smith",
    "Rigger",
    "Cook",
    "Leans",
    "Worth",
    "Burgler",
    "Woods",
    "Forest",
    "Rivers"
]

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateEmployee(){
    let emp = {};
    let primary = getRandomInt(3);
    let secondary = getRandomInt(2);
    if (primary == 0){
        emp.str = getRandomInt(6) + 10;
        emp.desc = pre_str[getRandomInt(pre_str.length)];
        emp.desc += " who ";
        if (secondary == 0){
            emp.int = getRandomInt(6) + 5;
            emp.cha = getRandomInt(6);
            emp.desc += post_int[getRandomInt(post_int.length)];
        } else {
            emp.cha = getRandomInt(6) + 5;
            emp.int = getRandomInt(6);
            emp.desc += post_cha[getRandomInt(post_cha.length)];
        }
    } else if (primary == 1){
        emp.int = getRandomInt(6) + 10;
        emp.desc = pre_int[getRandomInt(pre_int.length)];
        emp.desc += " who ";
        if (secondary == 0){
            emp.str = getRandomInt(6) + 5;
            emp.cha = getRandomInt(6);
            emp.desc += post_str[getRandomInt(post_str.length)];
        } else {
            emp.cha = getRandomInt(6) + 5;
            emp.str = getRandomInt(6);
            emp.desc += post_cha[getRandomInt(post_cha.length)];
        }
    } else{
        emp.cha = getRandomInt(6) + 10;
        emp.desc = pre_cha[getRandomInt(pre_int.length)];
        emp.desc += " who ";
        if (secondary == 0){
            emp.int = getRandomInt(6) + 5;
            emp.str = getRandomInt(6);
            emp.desc += post_int[getRandomInt(post_int.length)];
        } else {
            emp.str = getRandomInt(6) + 5;
            emp.int = getRandomInt(6);
            emp.desc += post_str[getRandomInt(post_str.length)];
        }
    }
    emp.wage = 0;
    emp.Tid = -1;
    emp.Gid = -1;
    emp.Eid = data.maxEid;
    data.maxEid++;
    emp.morale = 0;
    emp.name = first_names[getRandomInt(first_names.length)] + " " + last_names[getRandomInt(last_names.length)];
    return emp;
}


var tick = 0

//gotta use primary keys and stuff in here
window.setInterval(()=>{

            //task progress
        data = window.gameData
        
        
        for (let t of data.tasks){
            for (let e of data.employees){
                if (e.Tid == t.Tid && e.Tid != -1){
                    if (t.proj_percent > 0){
                        t.proj_percent -= Math.max((e[t.type] + e.morale/50) / 100, 0) 
                        
                        // morale modifier
                    } else {
                        t.proj_percent = 0
                    }
                    
                }
            }
        }
        //project progress
        let idx = 0
        for (let p of data.projects){
            //reset to 0 to prevent accumulation
            p.progress = 100;
            let nTasks = 0;
            for (let t of data.tasks){
                if (t.Pid == p.Pid){
                    p.progress -= t.proj_percent;
                    nTasks++;
                }
            }
            p.progress /= nTasks;
            if (p.progress < 0){
                //TODO database update here
                alert(p.name + " was completed!")
                data.money += p.value
                data.projects.splice(idx, 1)
            //reset and remove tasks 
                for (let t in data.tasks){
                    if (data.tasks[t].Pid == p.Pid){
                        for (let e of data.employees){
                            if (e.Tid == data.tasks[t].Tid){
                                e.Tid = -1;
                            }
                        } 

                        data.tasks.splice(t, 1)
                    }
                    
                }
            
            }
            idx++;
        
            
        }
        //wage morale update
        for (let e of data.employees){
            if (e.Tid != -1){
                e.morale += (e.wage - 11)
                data.money -= e.wage
            } else {
                //idle morale
                e.morale -= 0.5
            }

            if (e.morale > 300){
                e.morale = 300
            }
            
        
        }
        //group morale

        for (let g of data.groups){
            if (g.Gid != -1){
                let gMorale = 0
                let mCha = 0
                let nEmps =0 
                for (let e of data.employees){
                    if (e.Gid == g.Gid){
                        gMorale += e.morale
                        nEmps++;
                    }
                    if (e.eid == g.eid){
                        if (e.morale > 100){
                            mCha = -e.cha
                        } else {
                            mCha = e.cha
                        }
                        
                    }
                
                }
                //spread based on manager's cha
                gMorale /= nEmps;
                for (let e of data.employees){
                    if (e.Gid == g.Gid){
                        if (e.morale < gMorale){
                            e.morale += mCha/2;
                        } else {
                            e.morale -= 10/(mCha+1);
                        }
                    }
                
                
                }
            }
            
        }


        //applicants
        tick += 1
        if (tick % 60 == 0){
            data.applicants = [
                generateEmployee(),
                generateEmployee(),
                generateEmployee()
            ]
        }

        if (tick % 3600 == 0 || tick == 1){
            data.projectProposals = [
                generateProject(),
                generateProject(),
                generateProject()
            ]
        }

        window.gameData = data
    
  
   
}, 1000)

export default data;