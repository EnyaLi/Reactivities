import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid} from 'uuid';
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

interface IProps {
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({
  activity: initialFormState,
}) => {
  const activityStore = useContext(ActivityStore);
  const {createActivity, editActivity, submitting, cancleFormOpen} = activityStore;
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChanges = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });    
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChanges}
          name="title"
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChanges}
          name="description"
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChanges}
          name="category"
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChanges}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChanges}
          name="city"
          placeholder="City"
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChanges}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        />
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={cancleFormOpen}
          floated="right"
          type="submit"
          content="Cancle"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
