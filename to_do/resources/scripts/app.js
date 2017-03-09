// SELECT CONTROLLER
var selectPopulate = (function () {
  var days, selectDay, selectHourFrom, selectMinFrom, selectHourTo, selectMinTo,
      classNamesStorage, df1, df2, df3, df4, df5;

  // Get the classes for each select element,
  // as well as for the input field and
  // the button element
  classNamesStorage = {
    selectDays:       '.days',
    selectHoursFrom:  '.time-hours-from',
    selectMinsFrom:   '.time-mins-from',
    selectHoursTo:    '.time-hours-to',
    selectMinsTo:     '.time-mins-to',
    inputValue:       '.input-value',
    inputBtn:         '.input-btn'
  };

  // Create the days, that our selectPopulateDays function
  // is going to use, to set them dynamically
  days = {
    monday:          'Monday',
    tuesday:         'Tuesday',
    wednesday:       'Wednesday',
    thursday:        'Thursday',
    friday:          'Friday',
    saturday:        'Saturday',
    sunday:          'Sunday'
  };

  // Get the input field
  inputVal        = document.querySelector(classNamesStorage.inputValue);
  // Get the select day field
  selectDay       = document.querySelector(classNamesStorage.selectDays);
  // Get the select hour from field
  selectHourFrom  = document.querySelector(classNamesStorage.selectHoursFrom);
  // Get the select minute from field
  selectMinFrom   = document.querySelector(classNamesStorage.selectMinsFrom);
  // Get the select hour to field
  selectHourTo    = document.querySelector(classNamesStorage.selectHoursTo);
  // Get the select minute to field
  selectMinTo     = document.querySelector(classNamesStorage.selectMinsTo);
  // Create the document fragments
  df1             = document.createDocumentFragment();
  df2             = document.createDocumentFragment();
  df3             = document.createDocumentFragment();
  df4             = document.createDocumentFragment();
  df5             = document.createDocumentFragment();

  return {
    // Get the values of the select and input element(s)
    getInput: function () {
      return {
        typeDay:       selectDay.value,
        typeHourFrom:  selectHourFrom.value,
        typeMinFrom:   selectMinFrom.value,
        typeHourTo:    selectHourTo.value,
        typeMinTo:     selectMinTo.value,
        typeValue:     inputVal.value,
        typeValueName: inputVal.name
      }
    },

    selectPopulateDays: function () {
      // Loop through the days object
      for (var item in days) {
        // Create the options
        var opts = document.createElement('option');

        // Set the options value
        opts.value = days[item];

        // Set the options text
        opts.appendChild(document.createTextNode(days[item]));

        // Append the options to the document fragment
        df5.appendChild(opts);

        // Append the document fragment to the select with class of '.days'
        selectDay.appendChild(df5);
      }
    },

    selectPopulateHours: function () {
      var hours, ampm, i;

      // Make the hours
      for (i = 0; i <= 1380; i += 60) {
        // Create the options
        var opts1 = document.createElement('option');
        var opts2 = document.createElement('option');

        // Get the hours
        hours = Math.floor(i / 60);

        // Check if its AM or PM
        ampm = hours % 24 < 12 ? 'am' : 'pm';

        // If hours are less than 10, add leading 0;
        // example: 00 am, 01 am, 02 am and so forth
        if (hours < 10){
          hours = '0' + hours;
        }

        // Set the options value
        opts1.value = hours;

        // Set the options text
        opts1.appendChild(document.createTextNode(hours + ' ' + ampm));

        // Append the options to the document fragment
        df1.appendChild(opts1);

        // Set the options value
        opts2.value = hours;

        // Set the options text
        opts2.appendChild(document.createTextNode(hours + ' ' + ampm));

        // Append the options to the document fragment
        df2.appendChild(opts2);

        // Populate the select
        this.selectPopulateOptions();
      }
    },

    selectPopulateMinutes: function () {
      var minutes, i;

      // Create the minutes
      for (i = 0; i < 60; i += 1) {
        // Create the options
        var opts1 = document.createElement('option');
        var opts2 = document.createElement('option');

        // Get the minutes
        minutes = i % 60;

        // If minutes are less than 10, add leading 0;
        // example: 01 min, 02 min, 09 min and so forth
        if (minutes < 10) {
          minutes = '0' + minutes;
        }

        // Set the options value
        opts1.value = minutes;

        // Set the options text
        opts1.appendChild(document.createTextNode(minutes + ' min'));

        // Append the options to the document fragment
        df3.appendChild(opts1);

        // Set the options value
        opts2.value = minutes;

        // Set the options text
        opts2.appendChild(document.createTextNode(minutes + ' min'));

        // Append the options to the document fragment
        df4.appendChild(opts2);

        // Populate the select
        this.selectPopulateOptions();
      }
    },

    selectPopulateOptions: function () {
      // Store the ids of the select elements
      var ids = [selectHourFrom.id, selectHourTo.id, selectMinFrom.id, selectMinTo.id];

      // Loop through the select elements ids
      for (let i = 0; i < ids.length; i++) {
        var uIDs = ids[i];
        // Set the counter to a string
        var strIDs = uIDs;

        // If the id is equal to the select element id
        // append the document fragment
        if (strIDs === 's-0') {
          selectHourFrom.appendChild(df1);
        }

        if (strIDs === 's-1') {
          selectHourTo.appendChild(df2);
        }

        if (strIDs === 's-2') {
          selectMinFrom.appendChild(df3);
        }

        if (strIDs === 's-3') {
          selectMinTo.appendChild(df4);
        }
      }
    },

    // Reset input field
    clearInput: function () {
      if (inputVal.value !== '') {
        inputVal.value = '';
        inputVal.focus();
      }
    },

    // Reset select fields
    clearSelects: function () {
      if (selectDay.options[selectDay.selectedIndex].value !== 'Monday') {
        selectDay.selectedIndex = null;
      }

      if (selectHourFrom.options[selectHourFrom.selectedIndex].value !== '00 am') {
        selectHourFrom.selectedIndex = null;
      }

      if (selectMinFrom.options[selectMinFrom.selectedIndex].value !== '00 min') {
        selectMinFrom.selectedIndex = null;
      }

      if (selectHourTo.options[selectHourTo.selectedIndex].value !== '00 am') {
        selectHourTo.selectedIndex = null;
      }

      if (selectMinTo.options[selectMinTo.selectedIndex].value !== '00 min') {
        selectMinTo.selectedIndex = null;
      }
    },

    // Display the dynamically created select options
    displaySelects: function () {
      return {
        displayDays: this.selectPopulateDays(),
        displayHours: this.selectPopulateHours(),
        displayMinutes: this.selectPopulateMinutes()
      };
    },

    // Expose the classes so that we can use them
    getDOMClasses: function () {
      return classNamesStorage;
    }
  };
})();

// UI CONTROLLER
var UIController = (function () {
  // Set up UI and dynamic content
  var data, taskClasses, mainContainer, df1, df2, tasksLeft, taskToDoTitle,
      tasksOnHoldRight, taskOnHoldTitle, tasksFinish, taskFinishTitle, counter;

  // Set the counter to 0, then, when it's called
  // update the counter and increment the id of the element
  counter = 0;

  // Get the classes for each task;
  // for the to-do div, for the on-hold div
  // and for the finished div
  taskClasses = {
    tasksContainer: '.tasks',
    tasksToDo: 'to-do-task-left',
    tasksToDoTitle: 'to-do-title',
    tasksToDoTitleLeft: 'left-title',
    taskToDoWrapper: 'to-do-wrapper',
    taskToDoWrapperLeft: 'left-wrapper',
    taskToDoText: 'to-do-text',
    taskToDoBtn: 'complete-btn',
    taskToDoBtnCmpl: 'to-do-complete',
    taskToDoBtnCmplStyle: 'to-do-cmplt-style',
    taskToDoHoldBtn: 'hold-btn',
    taskToDoBtnHold: 'to-do-hold',
    taskToDoBtnHoldStyle: 'to-do-hold-style',
    taskToDoDelBtn: 'delete-btn',
    taskToDoBtnDel: 'to-do-delete',
    taskToDoBtnDelStyle: 'to-do-del-style',

    tasksToDoRight: 'to-do-task-right',
    tasksOnHoldTitleRight: 'right-title',
    taskOnHoldWrapperRight: 'right-wrapper',
    taskOnHoldCmplStyle: 'on-hold-cmplt-style',
    taskOnHoldDelStyle: 'on-hold-del-style',

    tasksToDoFinish: 'to-do-task-bottom',
    tasksFinishTitle: 'bottom-title',
    taskFinishWrapper: 'bottom-wrapper',
    taskFinishDelStyle: 'finish-del-style',

    onHoldBtn: '.to-do-hold'
  };

  // Get the main container, .tasks
  mainContainer = document.querySelector(taskClasses.tasksContainer);

  // Create the fragrements
  df1 = document.createDocumentFragment();
  df2 = document.createDocumentFragment();
  df3 = document.createDocumentFragment();

  // Create the to-do task div
  tasksLeft = document.createElement('div');
  tasksLeft.classList.add(taskClasses.tasksToDo);

  // Create the to-do task title
  taskToDoTitle = document.createElement('h1');
  taskToDoTitle.textContent = 'TO DO TASKS';
  taskToDoTitle.classList.add(taskClasses.tasksToDoTitle, taskClasses.tasksToDoTitleLeft);

  // Create the on-hold task div
  tasksOnHoldRight = document.createElement('div');
  tasksOnHoldRight.classList.add(taskClasses.tasksToDoRight);

  // Create the on-hold task title
  taskOnHoldTitle = document.createElement('h1');
  taskOnHoldTitle.textContent = 'ON HOLD TASKS';
  taskOnHoldTitle.classList.add(taskClasses.tasksToDoTitle, taskClasses.tasksOnHoldTitleRight);

  // Create the finished task div
  tasksFinish = document.createElement('div');
  tasksFinish.classList.add(taskClasses.tasksToDoFinish);

  // Create the finished task title
  taskFinishTitle = document.createElement('h1');
  taskFinishTitle.textContent = 'FINISHED TASKS';
  taskFinishTitle.classList.add(taskClasses.tasksToDoTitle, taskClasses.tasksFinishTitle);

  // Append the tasks to the fragments
  df1.appendChild(tasksLeft);
  df2.appendChild(tasksOnHoldRight);
  df3.appendChild(tasksFinish);

  // Append the title to the parent elements
  tasksLeft.appendChild(taskToDoTitle);
  tasksOnHoldRight.appendChild(taskOnHoldTitle);
  tasksFinish.appendChild(taskFinishTitle);

  // Append the taks fragrements to the main container
  mainContainer.append(df1);
  mainContainer.append(df2);
  mainContainer.append(df3);

  // Set the data structure
  data = {
    toDo: [],
    onHold: [],
    finished: []
  };

  return {
    // Return the containers
    getTasksClasses: function () {
      return {
        mContainer: mainContainer,
        taskLeft: tasksLeft,
        taskOnHoldRight: tasksOnHoldRight,
        taskFinish: tasksFinish
      };
    },

    // Create the to-do wrapper
    toDo: function (parentElm, input, capitalLetter, onHoldCb, finishCb) {
      var taskWrapper, taskLeftText, completeBtn, onHoldBtn, deleteBtn,
          df5, df6, df7, df8, df9;

      // Update the counter
      counter += 1;

      // Create the fragment; df = stands for document fragment
      df5 = document.createDocumentFragment();
      // Create the wrapper div, with class .left-wrapper
      taskWrapper = document.createElement('div');
      // Set the classes
      taskWrapper.classList.add(taskClasses.taskToDoWrapper, taskClasses.taskToDoWrapperLeft);

      df6 = document.createDocumentFragment();
      // Create the paragraph
      taskLeftText = document.createElement('p');
      // Set the class
      taskLeftText.classList.add(taskClasses.taskToDoText);
      // Append the input values that the user entered
      taskLeftText.appendChild(document.createTextNode(capitalLetter + ' - ' + input.typeHourFrom + ':' + input.typeMinFrom + ' - ' + input.typeHourTo + ':' + input.typeMinTo + ' - ' + input.typeDay));

      df7 = document.createDocumentFragment();
      // Create the complete button
      completeBtn = document.createElement('button');
      // Set the classes
      completeBtn.classList.add(taskClasses.taskToDoBtn, taskClasses.taskToDoBtnCmpl, taskClasses.taskToDoBtnCmplStyle);

      df8 = document.createDocumentFragment();
      // Create the on-hold button
      onHoldBtn = document.createElement('button');
      onHoldBtn.classList.add(taskClasses.taskToDoHoldBtn, taskClasses.taskToDoBtnHold, taskClasses.taskToDoBtnHoldStyle);

      df9 = document.createDocumentFragment();
      // Create the delete button
      deleteBtn = document.createElement('button');
      deleteBtn.classList.add(taskClasses.taskToDoDelBtn, taskClasses.taskToDoBtnDel, taskClasses.taskToDoBtnDelStyle);

      // Append the dynamically created elements
      // to the document fragments
      df5.appendChild(taskWrapper);
      df6.appendChild(taskLeftText);
      df7.appendChild(completeBtn);
      df8.appendChild(onHoldBtn);
      df9.appendChild(deleteBtn);

      // Append the taskWrapper to the parent element
      // called from the function parameter, parentElm = tasksLeft
      parentElm.appendChild(df5);

      // Set the id and update it
      taskWrapper.setAttribute('id', counter);

      // Append the paragraph and the buttons
      taskWrapper.appendChild(df6);
      taskWrapper.appendChild(df7);
      taskWrapper.appendChild(df8);
      taskWrapper.appendChild(df9);

      // Push the items into the toDo array
      data.toDo.push(taskWrapper);

      // Move items to the on-hold list
      onHoldBtn.addEventListener('click', function (event) {
        // Set a callback function that takes the parameters
        // that are inserted into the toDo function, and set those
        // parameters to what was inserted from the input
        onHoldCb(parentElm, taskWrapper, taskLeftText, finishCb);
      });

      // Move items to the finished list
      completeBtn.addEventListener('click', function (event) {
        // Same as the on-hold callback function
        finishCb(parentElm, taskWrapper, taskLeftText);
        data.toDo.splice(taskWrapper, 1);
      });

      // Delete items from the to-do list
      deleteBtn.addEventListener('click', function (event) {
        // Delete the child element of the parement element
        parentElm.removeChild(taskWrapper);
        // Remove the item from the data
        data.toDo.splice(taskWrapper, 1);
      });
    },

    // Create the on-hold wrapper
    onHold: function (parentElm, wrapper, txtContent, finCb) {
      var taskOnHoldWrapper, taskOnHoldText, completeBtnOnHold, deleteBtnOnHold;
      counter += 1;

      // Create the wrapper div, with class .right-wrapper
      taskOnHoldWrapper = document.createElement('div');
      // Set the classes
      taskOnHoldWrapper.classList.add(taskClasses.taskToDoWrapper, taskClasses.taskOnHoldWrapperRight);

      // Create the paragraph
      taskOnHoldText = document.createElement('p');
      // Set the class
      taskOnHoldText.classList.add(taskClasses.taskToDoText);
      // Set whatever input was inserted from the to-do list
      taskOnHoldText.textContent = txtContent.textContent;

      // Create the complete button
      completeBtnOnHold = document.createElement('button');
      // Set the classes
      completeBtnOnHold.classList.add(taskClasses.taskToDoBtn, taskClasses.taskToDoBtnCmpl, taskClasses.taskOnHoldCmplStyle);

      // Create the delete button
      deleteBtnOnHold = document.createElement('button');
      // Set the classes
      deleteBtnOnHold.classList.add(taskClasses.taskToDoDelBtn, taskClasses.taskToDoBtnDel, taskClasses.taskOnHoldDelStyle);

      // Append the wrapper to the parent element
      tasksOnHoldRight.appendChild(taskOnHoldWrapper);
      // Set the id of the wrapper
      taskOnHoldWrapper.setAttribute('id', counter);
      // Append the text to the wrapper
      taskOnHoldWrapper.appendChild(taskOnHoldText);
      //Append the buttons
      taskOnHoldWrapper.appendChild(completeBtnOnHold);
      taskOnHoldWrapper.appendChild(deleteBtnOnHold);

      // Push the data to the onHold array
      data.onHold.push(taskOnHoldWrapper);

      // Remove the item from the to-do list
      // and splice the data, once the on-hold button
      // has been clicked
      parentElm.removeChild(wrapper);
      data.toDo.splice(wrapper, 1);

      // Move items to the finished list
      completeBtnOnHold.addEventListener('click', function (event) {
        // Set a callback function that takes the parameters
        // that are inserted into the onHold function, and set those
        // parameters to what was inserted from the input
        finCb(tasksOnHoldRight, taskOnHoldWrapper, taskOnHoldText);
        data.onHold.splice(taskOnHoldWrapper, 1);
      });

      // Delete items from the on-hold list
      deleteBtnOnHold.addEventListener('click', function (event) {
        // Delete the child element of the parement element
        tasksOnHoldRight.removeChild(taskOnHoldWrapper);
        // Remove the item from the data
        data.onHold.splice(taskOnHoldWrapper, 1);
      });
    },

    finishTask: function (parentElm, wrapper, txtContent) {
      var taskFinished, taskFinishedText, deleteBtnFini;
      counter += 1;

      // Create the finish task wrapper, with class .bottom-wrapper
      taskFinished = document.createElement('div');
      // Set the classes
      taskFinished.classList.add(taskClasses.taskToDoWrapper, taskClasses.taskFinishWrapper);

      // Create the paragraph
      taskFinishedText = document.createElement('p');
      // Set the class
      taskFinishedText.classList.add(taskClasses.taskToDoText);
      // Set whatever input was inserted from the to-do list
      taskFinishedText.textContent = txtContent.textContent;

      // Create the delete button
      deleteBtnFini = document.createElement('button');
      // Set the classes
      deleteBtnFini.classList.add(taskClasses.taskToDoDelBtn, taskClasses.taskToDoBtnDel, taskClasses.taskFinishDelStyle);

      // Append the wrapper to the parent element
      tasksFinish.appendChild(taskFinished);
      // Set the id of the wrapper
      taskFinished.setAttribute('id', counter);
      // Append the text to the wrapper
      taskFinished.appendChild(taskFinishedText);
      // Append the button
      taskFinished.appendChild(deleteBtnFini);

      // Push the data to the finished array
      data.finished.push(taskFinished);

      // Remove the item from the to-do or on-hold list
      // and splice the data, once the completed button
      // has been clicked
      parentElm.removeChild(wrapper);

      // Delete items from the finish list
      deleteBtnFini.addEventListener('click', function (event) {
        // Delete the child element of the parement element
        tasksFinish.removeChild(taskFinished);
        // Remove the item from the data
        data.finished.splice(taskFinished, 1);
      });
    },

    getTaskClasses: function () {
      return taskClasses;
    },

    getData: function () {
      return data;
    },

    testing: function (type) {
      console.log(data);
    }
  };
})();

var controller = (function (selectCtrl, uiCtrl) {
  // Setup event listeners
  var setupEventListeners = function () {
    // Get the classNamesStorage
    var domClasses = selectCtrl.getDOMClasses();

    // Set mouse click to insert items on the to-do list
    document.querySelector(domClasses.inputBtn).addEventListener('click', ctrlAddItem);

    // Set the ENTER key as an keypress event to insert items
    // on the to-do list
    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function () {
    var input, containers, toDoItems, onHoldItemsCb, finishItemCb, capitlisedFirstLetter, data, lstorage;
    // Get the inputs
    input = selectCtrl.getInput();

    if (input.typeValue !== '') {
      // Get the data
      data = uiCtrl.getData();

      // Capitlise only the first letter
      capitlisedFirstLetter = input.typeValue.charAt(0).toUpperCase() + input.typeValue.slice(1).toLowerCase();

      // Get the containers so that we can
      // append their children elements
      containers = uiCtrl.getTasksClasses();

      // Callback function to the toDo function
      // so that we can move the toDo elements on to
      // the on-hold task function
      onHoldItemsCb = uiCtrl.onHold;

      // Same as onHoldItemsCb
      finishItemCb = uiCtrl.finishTask;

      // Add new item on the do list
      toDoItems = uiCtrl.toDo(containers.taskLeft, input, capitlisedFirstLetter, onHoldItemsCb, finishItemCb);

      uiCtrl.testing(data.toDo);

      // Reset the input field
      selectCtrl.clearInput();

      // Reset the select fields
      selectCtrl.clearSelects();
    }
  };

  return {
    // Start the app
    init: function () {
      console.log('App is working!');

      // Display the options
      selectCtrl.displaySelects();

      // Set the event listeners
      setupEventListeners();
    }
  };
})(selectPopulate, UIController);

controller.init();
