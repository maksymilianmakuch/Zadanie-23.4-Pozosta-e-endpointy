import Lane from '../models/lane';
import uuid from 'uuid';

export function addLane(req, res) {
	if (!req.body.name) {
		res.status(403).end();
	}

	const newLane = new Lane(req.body);

	newLane.notes = [];

	newLane.id = uuid();
	newLane.save((err, saved) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json( saved );
	});
};

export function getLanes(req, res) {
	Lane.find().exec((err, lanes) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ lanes });
	});
};

export function deleteLane(req, res) {
	Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
		if (err) {
			res.status(500).send(err);
		}
		lane.notes.forEach((note) => {
      		note.remove();
    	});

		lane.remove(() => {
			res.status(200).end();
		});
	});
};

export function editLane(req, res) {
  	if (!req.body.name) {
    	res.status(400).end();
  	}

	Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
	    if (err) {
	    	res.status(500).send(err);
	    }

	    lane.update({ name: req.body.name }, (updateErr) => {
	        if (updateErr) {
	          res.status(500).send(err);
	        }

	        res.status(200).end();
	    });
	});
}
