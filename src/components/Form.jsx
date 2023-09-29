import React, { Component } from 'react'
import "./Form.css"
export default class Form extends Component {
    constructor() {
        super();
        this.state = {
          userDetails: {
            fname:"",
            lname:"",
            country:""
          },
          userData:[],
          index:"",
          isEditing: false
        }
    }

    handleChange = (e) =>{
      this.setState({
        userDetails: {...this.state.userDetails, [e.target.name]: e.target.value}
      })
    }

    handleSubmit = ()=>{
      const {userData, userDetails}=this.state
      if(this.state.index === ""){
        userData.push(userDetails)
        this.setState({userData: userData})
      }else{
        userData[this.state.index]=userDetails
        this.setState({userData: userData})
      }
      this.resetData()
      this.setState({index:''})
    }

    resetData = () => {
      this.setState({
        userDetails:{
          fname:"",
          lname:"",
          country:""
        },

      })
    }
    handleEdit = (i) =>{
      const{userData} = this.state
      this.setState({ userDetails: userData[i], index: i, isEditing: true })
    }

    handleDelete = (i) =>{
      const{userData} = this.state
      userData.splice(i,1)
      this.setState({
        userData:[...userData],
        isEditing: false 
      })
    }

    handleCancel = () => {
      this.resetData();
      this.setState({
          isEditing: false,
          editDetails: {},
      });
  }

  render() {
    const {userData, userDetails, isEditing} = this.state
    return (
      <div>
        <h3 style={{textAlign:'center'}}>Contact Form</h3>
        <div className="container">
            <div className="row">
              <label>First Name</label>
              <input type="text" id="fname" name="fname" value={userDetails.fname} placeholder="Your name.." onChange={(e) =>this.handleChange(e)} />
            </div>
            <div className="row">
              <label>Last Name</label>
              <input type="text" id="lname" name="lname" placeholder="Your last name.." onChange={(e) =>this.handleChange(e)} value={userDetails.lname}/>
            </div>
            <div className="row">
              <label>Country</label>
              <select id="country" name="country" onChange={(e) =>this.handleChange(e)} value={userDetails.country}>
                <option value="">Select your country</option>
                <option value="india">India</option>
                <option value="brazil">Brazil</option>
                <option value="australia">Australia</option>
                <option value="canada">Canada</option>
                <option value="usa">USA</option>
              </select>
            </div>
            <div className="row">
              <button type="button" value="Submit" onClick={() => this.handleSubmit()}>Submit </button>
            </div>
        </div>
        <h2 style={{textAlign:"center"}}>User Data Table</h2>
        <table>
          <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
          {userData.map((value, i) => {
            return (<tr key={i}>
              <td>{isEditing && this.state.index === i ? (
                <input type="text" name="fname" value={userDetails.fname} onChange={(e) => this.handleChange(e)} />
              ) : ( value.fname )}
              </td>
              <td>{isEditing && this.state.index === i ? (
                <input type="text" name="lname" value={userDetails.lname} onChange={(e) => this.handleChange(e)} />
              ) : ( value.lname )}
              </td>
              <td>{isEditing && this.state.index === i ? (
                <select name="country" onChange={(e) => this.handleChange(e)} value={userDetails.country}>
                  <option value="">Select your country</option>
                  <option value="india">India</option>
                  <option value="brazil">Brazil</option>
                  <option value="australia">Australia</option>
                  <option value="canada">Canada</option>
                  <option value="usa">USA</option>
                </select>
              ) : ( value.country )}
              </td>
              <td>{isEditing && this.state.index === i ? (
                  <>
                    <button type='button' style={{ margin: 5 }} onClick={() => this.handleSubmit()}>Save</button>
                    <button type='button' style={{ margin: 5 }} onClick={() => this.handleCancel()}>Cancel</button>
                  </>
                ) : ( <>
                        <button type='button' style={{ margin: 5 }} onClick={() => this.handleEdit(i)}>Edit</button>
                        <button type='button' style={{ margin: 5 }} onClick={() => this.handleDelete(i)}>Delete</button>
                      </>
                )}
              </td>
            </tr>)})}
          </tbody>
        </table>
      </div>
    )
  }
}
