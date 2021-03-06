# TodoList

Just a simple Todo List webapp inspired by [Oliver Cederborg](https://dribbble.com/oliver). 
Go check his work!


## Core

### Data Structure

```JS
const [lists, setLists] = useState([
   {
      id: '0cd8c913-1846-4a33-a3a5-2d75f1e8b73d',
      name: 'School',
      icon: '🦁',
      color: "#c88323",
      tasks: [
         {
            id: '70951762-dab7-11ec-9d64-0242ac120002',
            name: 'Finish the essay collaboration',
            done: false,
            date: '',
            note: '',
            files: [],
            sub: [
               {
                  name: 'Homework class 102',
                  done: false,
               }
            ],
         }
      ],
   }
]);

```

## My Todo List 📝
- [x] Complete task/subtask
- [x] Progress ring
- [x] Add/Update/Delete Subtask
- [x] Task note
- [ ] Change collection
- [ ] Date selector
- [ ] Dashbaord daily tab and all task tab
- [ ] Notification
- [ ] Profile page
- [ ] Add file UI
- [ ] Add animation
- [ ] More responsive CSS
- [ ] Light/Dark mode


## Issue
- [ ] Bug onClick not working when clicking on emoji or title in dashboard page.
- [ ] Bug ctrl+a then backspace on contentEditale element (Collection title).
- [ ] Emoji picker overflow on small screen.
