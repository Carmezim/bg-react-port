import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavBar = props => {
	return (
		<div className="wide">
			<ul className="tabs-menu ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
				<a className="adult-tab-button">Adult</a>
				<li className="tab-group-adult tab-1 active ui-state-default ui-corner-top current ui-tabs-active ui-state-active">
					<NavLink exact activeClassName="active" to="/dashboard/adult/past">
						Live
					</NavLink>
				</li>
				<li className="tab-group-adult ui-state-default ui-corner-top">
					<NavLink exact activeClassName="active" to="/dashboard/adult/hidden">
						Hidden
					</NavLink>
				</li>
					<li className="tab-group-adult tab-drafts-tab ui-state-default ui-corner-top">
					<NavLink exact activeClassName="active" to="/dashboard/adult/drafs">
						Drafts
					</NavLink>
				</li>
				<li className="tab-group-adult tab-5 ui-state-default ui-corner-top">
					<NavLink exact activeClassName="active" to="/dashboard/adult/curated">
						Curated Lists
					</NavLink>
				</li>
				<a className="children-tab-button">Children</a>
				<li className="tab-group-children ui-state-default ui-corner-top">
					<NavLink exact activeClassName="active" to="/dashboard/children/past">
						Live
					</NavLink>
				</li>
				<li className="tab-group-children ui-state-default ui-corner-top">
					<NavLink exact activeClassName="active" to="/dashboard/children/hidden">
						Hidden
					</NavLink>
				</li>
				<li className="tab-group-children tab-drafts-tab-children ui-state-default ui-corner-top">
					<NavLink exact activeClassName="active" to="/dashboard/children/drafs">
						Drafts
					</NavLink>
				</li>
				<li className="tab-group-children ui-state-default ui-corner-top">
					<NavLink exact activeClassName="active" to="/dashboard/children/curated">
						Curated Lists
					</NavLink>
				</li>
				<a className="children-tab-button">Imports</a>
				<li className="tab-group-imports tab-waterstones ui-state-default ui-corner-top current ui-tabs-active ui-state-active ui-state-hover">
					<NavLink exact activeClassName="active" to="/dashboard/imports/past">
						Via Waterstones
					</NavLink>
				</li>
				<li className="tab-group-imports tab-uploads ui-state-default ui-corner-top">
					<NavLink exact activeClassName="active" to="/dashboard/imports/hidden">
						Via Uploads
					</NavLink>
				</li>
				<li className="tab-group-imports tab-uploads ui-state-default ui-corner-top">
					<NavLink exact activeClassName="active" to="/dashboard/imports/hidden">
						Via FTP Uploads
					</NavLink>
				</li>
				<a className="children-tab-button">Settings</a>
				<li className="tab-group-settings ui-state-default ui-corner-top">
					<NavLink exact activeClassName="active" to="/dashboard/settings/past">
						Authors
					</NavLink>
				</li>
				<li className="tab-group-settings ui-state-default ui-corner-top">
					<NavLink exact activeClassName="active" to="/dashboard/settings/hidden">
						Categories
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default NavBar;
