import logo from './logo.svg';

//To simulate an API, add a setTimeout function in the handleSubmit function. 
//This will create an asynchronous operation that waits a certain amount of time before completing, 
//which behaves similarly to a request for external data. 
//Then use the useState Hook to create a submitting variable and a setSubmitting function. 
//Call setSubmitting(true) when the data is submitted and call setSubmitting(false) when the timeout is resolved:

//useState Hook.
//Inside App.js, use the useReducer Hook to create a formData object and a setFormData function. 
//For the reducer function, pull the name and value from the event.target object and 
//update the state by spreading the current state while adding the name and value at the end. 
//This will create a state object that preserves the current state while overwriting specific values as they change:
import React, { useReducer, useState } from 'react';
import './App.css';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value
  }
 }

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    createExamSQL();
    createApplicantSQL();
   setTimeout(() => {
     setSubmitting(false);
   }, 3000)
  }
  
  //custom function to create a SQL insert statement from the values of the user input fields
  function createExamSQL () {

    //INSERT [dbo].[ExamQuestions] ([QID], [ExamSection], [Num], [Question], [A], [B], [C], [D], [Answer]) 
    //VALUES (51, 
            //N'Comprehensive', 
            //1, 
            //N'A patient with cataract would most commonly complain of which symptoms',
            //N'Halos and rainbows around lights', 
            //N'Eye pain and irritation that worsens at night',
            //N'Blurred and hazy vision', 
            //N'Eye strain and headache when doing close work',
            //N'c')
    
    
    let sqlExamString_insert = 'INSERT [dbo].[ExamQuestions] ([QID], [ExamSection], [Num], [Question], [A], [B], [C], [D], [Answer]) VALUES' 
    let sqlExamString_values = '\r\n' + '('+formData.txtQID  
                  +',N' + '\''  +formData.txtExamSection+ '\''
                  +',' +formData.txtNum 
                  + ',N'+ '\''+formData.txtQuestion+'\''
                  +',N' + '\''+formData.txtA+'\''
                  +',N' + '\''+formData.txtB+'\''
                  +',N' + '\''+formData.txtC+'\''
                  +',N' + '\''+formData.txtD+'\''
                  +',N' + '\''+formData.txtAnswer+'\''
                  +'),'
    //console.log(sqlString)
    formData.txtExamResult = formData.txtExamResult + sqlExamString_values;

  }

  //custom function to create a SQL insert statement from the values of the user input fields
  function createApplicantSQL () {

    //INSERT [dbo].[ExamQuestions] ([QID], [ExamSection], [Num], [Question], [A], [B], [C], [D], [Answer]) 
    //VALUES (51, 
            //N'Comprehensive', 
            //1, 
            //N'A patient with cataract would most commonly complain of which symptoms',
            //N'Halos and rainbows around lights', 
            //N'Eye pain and irritation that worsens at night',
            //N'Blurred and hazy vision', 
            //N'Eye strain and headache when doing close work',
            //N'c')
    
    
    let sqlApplicantString_insert = 'INSERT INTO [dbo].[EMPApplicant] ([FirstName],[LastName],[Email],[Password],[DateLastModified],[DateRegistered]) VALUES' 
    let sqlApplicantString_values =  '\r\n' +
                   '(\''+formData.txtFirstName+ '\''
                  +',' + '\''  +formData.txtLastName+ '\''
                  +',' + '\''+formData.txtEmail+'\''
                  +',' + '\''+formData.txtEmail+'\''
                  +',GETDATE(),GETDATE()),'
                  
    //console.log(sqlApplicantString)
    formData.txtApplicantResult =  formData.txtApplicantResult + sqlApplicantString_values;

  }


  //The problem is that the SyntheticEvent is reused and cannot be passed to an asynchronous function. In other words, you can???t pass the event directly. To fix this, you???ll need to pull out the data you need before calling the reducer function.
  //Update the reducer function to take an object with a property of name and value. Then create a function called handleChange that pulls the data from the event.target and passes the object to setFormData. Finally, update the onChange event handler to use the new function:
  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }


  return (
    <div className="wrapper">
      <h1>NAS Exam questions</h1>
      {submitting &&
       <div> You are submitting the following:
       <ul>
         {Object.entries(formData).map(([name, value]) => (
           <li key={name}><strong>{name}</strong>:{value.toString()}</li>
         ))}
       </ul></div>
     }
      <form onSubmit={handleSubmit}>
      <fieldset>
         <label><p>QID</p><input name="txtQID" onChange={setFormData} value={formData.txtQID || ''} /></label>
         <label><p>Exam Section</p><input name="txtExamSection" onChange={setFormData}  value={formData.txtExamSection || ''} /></label>
         <label><p>Num</p><input name="txtNum" onChange={setFormData} value={formData.txtNum || ''} /></label>
         <label><p>Question</p><input name="txtQuestion" onChange={setFormData} value={formData.txtQuestion || ''} /></label>
         <label><p>A</p><input name="txtA" onChange={setFormData} value={formData.txtA || ''} /></label>
         <label><p>B</p><input name="txtB" onChange={setFormData} value={formData.txtB || ''} /></label>
         <label><p>C</p><input name="txtC" onChange={setFormData} value={formData.txtC || ''} /></label>
         <label><p>D</p><input name="txtD" onChange={setFormData} value={formData.txtD || ''} /></label>
         <label><p>Answer</p><input name="txtAnswer" onChange={setFormData} value={formData.txtAnswer || ''} /></label>
        
        </fieldset>
        <button type="btnCreateExamSQL">Create Exam SQL</button>
        <label><p>'INSERT [dbo].[ExamQuestions] ([QID], [ExamSection], [Num], [Question], [A], [B], [C], [D], [Answer]) VALUES'</p></label>
        <label><p>Result</p><textarea name="txtExamResult" cols="100" rows="10" onChange={setFormData} value={formData.txtExamResult || ''} /></label>
        <h1>NAS Applicant Info</h1>
         <fieldset>
         
         <label><p>FirstName</p><input name="txtFirstName" onChange={setFormData} value={formData.txtFirstName || ''} /></label>
         <label><p>LastName</p><input name="txtLastName" onChange={setFormData}  value={formData.txtLastName || ''} /></label>
         <label><p>Email</p><input name="txtEmail" onChange={setFormData} value={formData.txtEmail || ''} /></label>
        
         
       </fieldset>
      
       <button type="btnCreateApplicantSQL">Create Applicant SQL</button>

      
       <label><p>'INSERT INTO [dbo].[EMPApplicant] ([FirstName],[LastName],[Email],[Password],[DateLastModified],[DateRegistered]) VALUES'</p></label>
       <label><p>Result</p><textarea name="txtApplicantResult" cols="100" rows="10" onChange={setFormData} value={formData.txtApplicantResult || ''} /></label>
      
      
      </form>
  
    </div>
  );
}

export default App;
