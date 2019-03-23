import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../../actions/auth';

export class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }

    this.toggleNavigation = this.toggleNavigation.bind(this);
  }

  toggleNavigation() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div className={`navigation ${this.state.isOpen ? 'open' : ''}`}>
        <div className="navigation__button" onClick={this.toggleNavigation}>
          <div className="navigation__button-bar"></div>
        </div>
        <div className="navigation__menu-background">
          <div className="navigation__menu-content">
            <div className="navigation__profile">
              <div className="navigation__profile-image">
                <img src={this.props.user.photoURL} />
              </div>
              <div className="navigation__profile-name logo-font">
                {this.props.user.displayName}
              </div>
            </div>
            <ul className="navigation__items">
              <li className="navigation__item">
                <a href="javascript:void(0);" onClick={this.props.startLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div >)
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
