import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import flow from "lodash/flow";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import ReactList from "react-list";

// import component
import Item from "../common/draganddrop/Item";

// import action
import { moveItemRequest } from "./actions";

class ItemsList extends Component {
	constructor(props) {
		super(props);
		this.moveItem = this.moveItem.bind(this);
		this.renderItem = this.renderItem.bind(this);
	}

	static propTypes = {
		moveItemRequest: PropTypes.func,
		draggable: PropTypes.shape({
			mainList: PropTypes.array,
			fullList: PropTypes.array,
			isFetching: PropTypes.bool,
			requesting: PropTypes.bool,
			messages: PropTypes.array,
			error: PropTypes.array
		})
	};

	// React=List will iterate through the secondary
	// events list (fullList) rendering each of its item
	// as a draggable item using the 'Item' component
	renderItem(index, key) {
		const { draggable: fullList } = this.props;
		const list = fullList.fullList;
		const {
			name,
			title,
			ages,
			price,
			startDate,
			startTime
		} = list[index].attributes;
		return (
			<div key={list[index].id}>
				{!!list &&
					<Item
						key={list[index].id}
						index={key}
						id={list[index].id}
						name={name}
						title={title}
						price={price}
						date={startDate.toString()}
						ages={ages}
						time={startTime}
						moveItem={this.moveItem}
						whichList="SECOND"
					/>}
			</div>
		);
	}

	moveItem(dragIndex, hoverIndex, whichList) {
		const { draggable: { mainList, fullList } } = this.props;
		let sortedList;

		if (whichList === "SECOND") {
			sortedList = fullList;
			console.log("sortedList", sortedList);
		} else {
			sortedList = mainList;
			console.log("sortedList", sortedList);
		}
		const dragItem = sortedList[dragIndex];
		console.log(sortedList[dragIndex]);

		this.props.moveItemRequest(sortedList, dragIndex, hoverIndex, dragItem);
	}

	render() {
		const {
			draggable: {
				isFetching,
				mainList,
				fullList,
				requesting,
				messages,
				errors
			}
		} = this.props;
		return (
			<div className="draggable">
				<div className="main-list">
					{!!isFetching && <div>Loading events...</div>}
					{!isFetching &&
						!!mainList &&
						mainList.map((item, key) => {
							const {
								name,
								title,
								price,
								startDate,
								ages,
								startTime
							} = item.attributes;
							// Render each event onto a draggable item
							return (
								<div key={key}>
									{!!mainList &&
										<Item
											key={item.id}
											index={key}
											id={item.id}
											name={name}
											title={title}
											price={price}
											date={startDate.toString()}
											ages={ages}
											time={startTime}
											moveItem={this.moveItem}
											whichList="FIRST"
										/>}
								</div>
							);
						})}
					{!!errors &&
						errors.map(error => console.error(error.body, error.time))}
				</div>
				<div style={{ overflow: "auto", maxHeight: 900 }}>
					<ReactList
						itemRenderer={this.renderItem}
						length={fullList.length}
						type="uniform"
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	draggable: state.draggable
});

export default flow(
	DragDropContext(HTML5Backend),
	connect(mapStateToProps, { moveItemRequest })
)(ItemsList);
