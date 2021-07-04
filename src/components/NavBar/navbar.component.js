import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCode, faBars } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import '../../i18n.js';

import AuthService from "../../services/auth.service";

import "./navBar.component.scss";

const NavBar = (props) => {

  const [click, setClick] = useState(true);
  const { t } = useTranslation();
  const handleClick = () => setClick(!click);
  const logOut = () => AuthService.logout();

  return (
    <>
      <nav id="navbar" className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            {t('app.title')}
            <FontAwesomeIcon icon={faCode} />
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink exact to="/" activeClassName="active" className="nav-links" onClick={handleClick}>
                {t('navbar.home')}
              </NavLink>
            </li>
            {props.showModeratorBoard && (
              <li className="nav-item">
                <NavLink to={"/mod"} className="nav-links" onClick={handleClick}>
                  {t('navbar.board.moderator')}
                </NavLink>
              </li>
            )}
            {props.showAdminBoard && (
              <li className="nav-item">
                <NavLink to={"/admin"} className="nav-links" onClick={handleClick}>
                  {t('navbar.board.admin')}
                </NavLink>
              </li>
            )}

            {props.currentUser && (
              <li className="nav-item">
                <NavLink to={"/user"} className="nav-links" onClick={handleClick}>
                  {t('navbar.board.user')}
                </NavLink>
              </li>
            )}

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
            {props.currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to={"/profile"} className="nav-links" onClick={handleClick}>
                    {props.currentUser.username}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-links" onClick={logOut}>
                    {t('navbar.logout')}
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to={"/login"} className="nav-links" onClick={handleClick}>
                    {t('navbar.login')}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to={"/register"} className="nav-links" onClick={handleClick}>
                    {t('navbar.signup')}
                  </NavLink>
                </li>
              </div>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;