import { eventCreate } from "../../dashboard/actions";
import { reset } from "redux-form";

const submit = values => {
	const { createBookEvent, client, reset } = values;

	eventCreate(client, createBookEvent);

	reset();
};

export default submit;
