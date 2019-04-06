import React, {Component} from 'react';

class AdminPanel extends Component {
    render() {
        return (
            <div className='AddUser'>
                <div className='row'>
                    <div className='col-xl-12'>
                        {
                            this.props.users
                                .map(user =>
                                    <div key={user.uid} className="card float-left" style={{width: '18rem', marginRight: '1rem'}}>
                                        <div className="card-body">
                                            <h5 className="card-title">{ user.name }</h5>
                                            <p className="card-text">{ user.role }</p>
                                            <p className="card-text">{ user.email }</p>
                                            <button onClick={ () => this.removeData(user) } className="btn btn-link">Delete</button>
                                            <button onClick={ () => this.updateData(user) } className="btn btn-link">Edit</button>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-xl-12'>
                        <h1>Add new club member here</h1>
                        <form onSubmit={ this.handleSubmit }>
                            <div className="form-row mt-5">
                                <input type='hidden' ref='uid' />
                                <div className="form-group col-md-6">
                                    <label>Name</label>
                                    <input type="text" ref='name' className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Email</label>
                                    <input type="email" ref='email' className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Role</label>
                                    <input type="text" ref='role' className="form-control" placeholder="Role" />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminPanel;