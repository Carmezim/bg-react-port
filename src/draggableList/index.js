import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

// import component
import Item from "../common/draganddrop/Item";

// import action
import moveItem from "./actions";

class ListItem extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		listItems: PropTypes.array
	};

	render() {
		const { listItems } = this.props;
		return (
			<div className="draggable-list">
				{listItems.map((item, i) => (
					<Item
						key={item.id}
						index={i}
						id={item.id}
						item={item.text}
						moveItem={this.moveItem}
					/>
				))}
			</div>
		);
	}
}

const mapStateToPros = state => ({
	listItems: state.draggable.listItems
});

ListItem = DragDropContext(HTML5Backend)(ListItem);
ListItem = connect(mapStateToPros, { moveItem })(ListItem);

export default ListItem;
