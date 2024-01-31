import React, { useState, useContext } from "react";

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faSignOutAlt, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import { ThemeContext } from '../../Theme';
import '../../i18n.js';

import AuthService from "../../services/auth.service";

import "./navBar.component.scss";

const NavBar = (props) => {

  const [click, setClick] = useState(true);
  const { t } = useTranslation();
  const handleClick = () => setClick(!click);
  const logOut = () => AuthService.logout();

  const {theme, toggleTheme} = useContext(ThemeContext)

  const currentUser = AuthService.getCurrentUser();

  return (
        <nav id="navbar" className="navbar">
          <div className="nav-container">
            <NavLink exact to="/" className="nav-logo">
              {t('app.title')}
            </NavLink>

            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink exact to="/" activeClassName="active" className="nav-links" onClick={handleClick}>
                  {t('navbar.home')}
                </NavLink>
              </li>
              {props.showModeratorBoard && (
                <li className="nav-item">
                  <NavLink to={"/mod"} activeClassName="active" className="nav-links" onClick={handleClick}>
                    {t('navbar.board.moderator')}
                  </NavLink>
                </li>
              )}
              {props.showAdminBoard && (
                <li className="nav-item">
                  <NavLink to={"/admin"} activeClassName="active" className="nav-links" onClick={handleClick}>
                    {t('navbar.board.admin')}
                  </NavLink>
                </li>
              )}

              {props.currentUser && (
                <li className="nav-item">
                  <NavLink to={"/user"} activeClassName="active" className="nav-links" onClick={handleClick}>
                    {t('navbar.board.user')}
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink exact to="/pets" activeClassName="active" className="nav-links" onClick={handleClick}>
                  {t('navbar.pets')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to="/about" activeClassName="active" className="nav-links" onClick={handleClick}>
                  {t('navbar.about')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to="/contact" activeClassName="active" className="nav-links" onClick={handleClick}>
                  {t('navbar.contact')}
                </NavLink>
              </li>
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <NavLink to={"/profile"} activeClassName="active" className="nav-links" onClick={handleClick}>
                      {currentUser.username}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/logout" activeClassName="active" className="nav-links" title={t('navbar.logout')} onClick={logOut}>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                    </NavLink>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <NavLink to={"/login"} activeClassName="active" className="nav-links" onClick={handleClick}>
                      {t('navbar.login')}
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to={"/register"} activeClassName="active" className="nav-links" onClick={handleClick}>
                      {t('navbar.signup')}
                    </NavLink>
                  </li>
                </div>
              )}
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              {click ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </div>
            <button className="btn btn-primary" onClick={() => toggleTheme()}><FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun}/></button>
          </div>
        </nav>
  );
}

export default NavBar;