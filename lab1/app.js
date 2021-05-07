const readline = require('readline-sync')


const user = require("./models/user.js")
const UserRepository = require('./repositories/userRepository.js')
const users = new UserRepository("./data/users.json")



const courseRepository = require('./repositories/courseRepository.js')
const course = require('./models/course.js')
const courses = new courseRepository("./data/courses.json")

function getUsers()
{
    const items = users.getAllUsers()
    console.log("--------------------------------------\n")
    if(items === null)
    {
        console.log("list empty now!")
    }
    else{
        for(const item of items)
        {
            console.log(`id - ${item.id} login - "${item.login}" fullname - "${item.fullname}"\n`)
        }
    console.log("---------------------------------------\n")

    }
    
    
}
function getUsersid(id)
{
    id = readline.question("Enter id:")
    if( id < 0 )
    {
        console.log("Invalid input!")
    }
    else if(id === 0)
    {
        console.log("Invalid input!")
    }
    
    else{
    const Id = parseInt(id)
    const item = users.getUserById(Id)
    console.log("--------------------------------------\n")
    console.log(item)
    console.log("--------------------------------------\n")
    }


}

function getCourses()
{
    const items = courses.getAllCourses()
    if(items === null)
    {
        console.log("list is empty!")
    }
    else{
    console.log("----------------------------------------\n")
    for(const item of items)
    {
    console.log(`id - ${item.id} 
                 name - "${item.name}" 
                 duration - "${item.duration}" 
                 group - "${item.group} "
                 credits - "${item.credits}"
                 date - "${item.date}"\n`)
    }
    console.log("----------------------------------------\n")
    }

    
}
function getCourseById(id)
{ 
    id = readline.question("Enter id:")
    if(id < 0)
    {
        console.log("Invalid input!")
    }
    else if( id === 0)
    {
        console.log("Invalid input!")
    }
    else if(isNaN(id))
    {
        console.log("Invalid input!")
    }
    else{
        const Id = parseInt(id)
        const item = courses.getCourseId(Id)
        console.log(`id - ${item.id} 
                 name - "${item.name}" 
                 duration - "${item.duration}" 
                 group - "${item.group} "
                 credits - "${item.credits}"
                 date - "${item.date}"\n`)

    }
    

}
function courseDeletion(id)
{
    id = readline.question("Enter id:")
    if(id < 0)
    {
        console.log("Invalid input!")
    }
    else if( id === 0)
    {
        console.log("Invalid input!")
    }
    else if(isNaN(id))
    {
        console.log("Invalid input!")
    }
    else{
        const Id = parseInt(id)
        const item = courses.deleteCourse(Id)
        if(item === null)
        {
            console.log("Course not found!")
        }
        else{
            console.log(`Course "${item.name}" has been deleted succesfuly`)

        }

    }
}
function getDate() {
    let date, parsedDate;
    while (true) {
        date = readline.question("Enter the new date: ")
        parsedDate = Date.parse(date)
        if (date.length === 0)
        {
            console.log('Error. The data field is empty.\n')
        }
        else{
            break
        }
    }
    date = new Date(parsedDate).toISOString();
    return date;
}
function getUpdate(id){
    id = readline.question("Enter course id:")
const Id = parseInt(id)
const item = courses.getCourseId(Id)
    if (item === null)
        console.log("Course not found!");
    else {
        console.log(`id - ${item.Id} 
                 name - "${item.name}" 
                 duration - "${item.duration}" 
                 group - "${item.group} "
                 credits - "${item.credits}"
                 date - "${item.date}"\n`)
        let numberOfData = 0;
        while (true) {

            numberOfData = readline.question("Choose what you want to update \n 1- name \n 2-duration \n 3-group \n 4 - credits \n 5 - date \n");
            if (isNaN(numberOfData))
                console.log("Invalid input!")
            else if (numberOfData === '1') {
                const name = readline.question("Enter new name: ")
                item.name = name
            }
            else if (numberOfData === '2') {
                const duration = readline.question("Enter new duration: \n")
                if(isNaN(duration))
                {
                    console.log("Invalid input!")
                }
                else{
                item.duration = duration
                }
            }
            else if (numberOfData === '3')
            {
                const group = readline.question("Enter new group: \n")
                item.group = group
            }
                
            else if (numberOfData === '4'){
                const credits = readline.question("Enter new nimber of credits: \n")
                if (isNaN(credits))
                {
                    console.log("Invalid input!")
                }
                else{
                    item.credits = credits;
                }
            }

            else if (numberOfData === '5'){
                item.date = getDate()
            }

            else
            {
                console.log("Invalid input!")
            }
            courses.UpdateCourse(item)
            console.log("Course updated!")
            break;
        }
    }
}
function postCourse()
{
    let newCourse = new course()
    while (true) {
        newCourse.name = readline.question("Enter the name of course: \n")
        if (newCourse.name.length === 0)
            {
                console.log("Empty string!")
            }
        else break
        
    }
    while (true) {
        newCourse.duration = readline.question("\nEnter duration of course: ")
        if (newCourse.duration.length === 0)
            console.log("Empty string!")
        else break
    }
    
    while (true) {
        newCourse.group = readline.question("Enter group: \n")
        if (newCourse.group.length === 0)
            console.log("Empty string!")
        else break
    }
    let tmp = ''
    while (true) {
        tmp = readline.question("\nEnter the number of credits: ")
        if (isNaN(tmp))
            console.log("Invalid input!")
        else if (tmp < 0)
            console.log("Invalid input!")
        else if (tmp.length === 0)
            console.log("Empty string!")
        else break;
    }
    newCourse.credits = tmp
    let parsedDate = '';
    while (true) {
        tmp = readline.question("\nEnter date: ")
        parsedDate = Date.parse(tmp)
        if (isNaN(parsedDate) || new Date(tmp).TryParseExact === 'exactundefined')
            console.log(`Invalid input!\n`)
        else
            break;
    }
    tmp = new Date(parsedDate).toISOString()
    newCourse.date = tmp;
    const Id = courses.addCourse(newCourse)
    const addedCourse = courses.getCourseId(Id)
    console.log("----------------------------------------\n")
    console.log(`New course:\n id - ${addedCourse.id}\n name - ${addedCourse.name}\n duration - "${addedCourse.duration}"\n credits - ${addedCourse.credits}\n  group - ${addedCourse.group}\n date - ${addedCourse.date}\n`)
    console.log("----------------------------------------\n")
}



while (true) {
    const input = readline.question("Enter command:");
    console.log(input);
    
    

    if (input === "create") 
    {
        const name = readline.question("Enter name:")
        console.log(name)
    }
    else if(input === "get/courses")
    {
        getCourses()
    }
    else if(input === "get/course/id")
    {
        getCourseById()
    }
    else if(input === "delete/course")
    {
        courseDeletion()
    }
    else if(input === "update/course")
    {
        getUpdate()
    }
    else if(input === "get/users")
    {
        getUsers()  
    }
    else if(input === "get/user/id")
    {
        getUsersid()
    }
    else if(input === "post/course")
    {
        postCourse()
    }
    else if(input == "exit")
    {
        break;
    }
    else
    {
        console.log("Unknown command!")
    }
    
}