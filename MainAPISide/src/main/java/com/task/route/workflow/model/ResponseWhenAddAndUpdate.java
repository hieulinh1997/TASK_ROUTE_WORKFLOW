package com.task.route.workflow.model;

import java.util.ArrayList;

public class ResponseWhenAddAndUpdate {

	String status;
	ArrayList<Errors> errors;
	
	public ResponseWhenAddAndUpdate() {

	}
	
	public ResponseWhenAddAndUpdate(String status, ArrayList<Errors> errors) {
		super();
		this.status = status;
		this.errors = errors;
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public ArrayList<Errors> getErrors() {
		return errors;
	}
	public void setErrors(ArrayList<Errors> errors) {
		this.errors = errors;
	}
	
}
