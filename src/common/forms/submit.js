import { createEvent } from "../../dashboard/actions";

const submit = values => {
	const { createBookEvent, client, reset } = values;

	createEvent(client, createBookEvent);

	reset();
};

export default submit;
