import React from "react";
// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

const NavBar = props => {
	return (
		<div className="wide">
			<ul className="tabs-menu ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
				<NavLink
					className="adult-tab-button"
					activeClassName="active"
					exact
					to="/dashboard/adult"
				>
					Adult
				</NavLink>
				<li className="tab-group-adult tab-1 current active">
					<NavLink exact activeClassName="active" to="/dashboard/adult/past">
						Live
					</NavLink>
				</li>
				<li className="tab-group-adult">
					<NavLink exact activeClassName="active" to="/dashboard/adult/hidden">
						Hidden
					</NavLink>
				</li>
				<li className="tab-group-adult">
					<NavLink exact activeClassName="active" to="/dashboard/adult/hidden">
						Past
					</NavLink>
				</li>
				<li className="tab-group-adult tab-drafts-tab">
					<NavLink exact activeClassName="active" to="/dashboard/adult/drafs">
						Drafts
					</NavLink>
				</li>
				<li className="tab-group-adult tab-5">
					<NavLink exact activeClassName="active" to="/dashboard/adult/curated">
						Curated Lists
					</NavLink>
				</li>
				<NavLink exact className="children-tab-button" to="/dashboard/children">
					Children
				</NavLink>
				<li className="tab-group-children">
					<NavLink exact to="/dashboard/children/past">
						Live
					</NavLink>
				</li>
				<li className="tab-group-children">
					<NavLink exact to="/dashboard/children/hidden">
						Hidden
					</NavLink>
				</li>
				<li className="tab-group-children">
					<NavLink exact to="/dashboard/children/drafs">
						Drafts
					</NavLink>
				</li>
				<li className="tab-group-children">
					<NavLink exact to="/dashboard/children/curated">
						Curated Lists
					</NavLink>
				</li>
				<NavLink exact className="imports-tab-button" to="/dashboard/imports">
					Imports
				</NavLink>
				<li className="tab-group-imports">
					<NavLink exact activeClassName="active" to="/dashboard/imports/past">
						Via Waterstones
					</NavLink>
				</li>
				<li className="tab-group-imports">
					<NavLink
						exact
						activeClassName="active"
						to="/dashboard/imports/hidden"
					>
						Via Uploads
					</NavLink>
				</li>
				<li className="tab-group-imports">
					<NavLink
						exact
						activeClassName="active"
						to="/dashboard/imports/hidden"
					>
						Via FTP Uploads
					</NavLink>
				</li>
				<NavLink exact className="settings-tab-button" to="/dashboard/settings">
					Settings
				</NavLink>
				<li className="tab-group-settings ">
					<NavLink exact activeClassName="active" to="/dashboard/settings/past">
						Authors
					</NavLink>
				</li>
				<li className="tab-group-settings ">
					<NavLink
						exact
						activeClassName="active"
						to="/dashboard/settings/hidden"
					>
						Categories
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default NavBar;
