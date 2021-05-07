const course = require("../models/course.js")
const JsonStorage = require("../JsonStorage.js")

class courseRepository
{
    constructor(filePath)
    {
        this.storage = new JsonStorage(filePath)
    }
    getAllCourses()
    {
        const items = this.storage.readItems().items;
         let courses = [];
         for( const item of items)
         {
             let Course = new course(item.id , item.name , item.duration , item.group , item.credits , item.date);
             courses.push(Course);

         }
         return courses;
    }
    getCourseId(id)
    {
        const items = this.storage.readItems().items;
        for(const item of items)
        {
        if(item.id === id)
          {
            return new course(item.id,item.name,item.duration,item.group,item.credits,item.date)
          }
        }

    }
    addCourse(entityModel)
    {
        const items = this.storage.readItems();
        entityModel.id = this.storage.nextId;
        items.items.push(entityModel);
        this.storage.writeItems(items)
        this.storage.incrementNextId()
        return entityModel.id

    }
    UpdateCourse(entityModel)
    {
        const items = this.storage.readItems();
        for (let i = 0; i < items.items.length; i++)
        {
            if (items.items[i].id === entityModel.id) {
                items.items[i] = entityModel;
                this.storage.writeItems(items);
                return true;
            }
        }
        return null;

    }
    deleteCourse(entityId)
    {
        const items = this.storage.readItems();
        for (let i = 0; i < items.items.length; i++) {
            if (items.items[i].id === entityId) {
                const course = items.items[i];
                items.items.splice(i, 1);
                this.storage.writeItems(items);
                return course;
            }
        }

        return null;

    }


}

module.exports = courseRepository;