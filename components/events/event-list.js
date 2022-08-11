import EventItem from "./event-item";
import classes from "./event-list.module.css";

const EventList = (props) => {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items &&
        items.map((event) => (
          <EventItem
            key={event.id}
            title={event.title}
            location={event.location}
            date={event.date}
            image={event.image}
            id={event.id}
          />
        ))}
    </ul>
  );
};

export default EventList;
