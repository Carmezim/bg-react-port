import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import flow from "lodash/flow";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

// import component
import Item from "../common/draganddrop/Item";

// import action
import { moveItemRequest } from "./actions";

class ItemsList extends Component {
	constructor(props) {
		super(props);
		this.moveItem = this.moveItem.bind(this);
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
				<div className="full-list">
					<h2>Second List</h2>
					{fullList.map((item, key) => {
						const {
							name,
							title,
							price,
							startDate,
							startTime
						} = item.attributes;
						// Render each event onto a draggable item
						return (
							<div key={item.id}>
								{!!fullList &&
									<Item
										key={item.id}
										index={item.id}
										id={item.id}
										name={name}
										title={title}
										price={price}
										date={startDate.toString()}
										time={startTime}
										moveItem={this.moveItem}
										whichList="SECOND"
									/>}
							</div>
						);
					})}
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
