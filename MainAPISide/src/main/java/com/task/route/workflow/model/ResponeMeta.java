package com.task.route.workflow.model;

import java.util.ArrayList;

public class ResponeMeta {

	String status;
	ArrayList<String> meta;
	int total;
	ArrayList<Errors> errors;
	ArrayList<WorkFlow> data;
	int maxWorkFlowID;
	
//	@Override
//	public String toString() {
//		return "ResponeMeta [status=" + status + ", meta=" + meta + ", total=" + total + ", errors=" + errors
//				+ ", data=" + data + ", maxWorkFlowID=" + maxWorkFlowID + "]";
//	}
	
	public ResponeMeta() {
		
	}
	
//	public ResponeMeta(String status, ArrayList<String> meta, int total, ArrayList<Errors> errors,
//			ArrayList<WorkFlow> data, int maxWorkFlowID) {
//		super();
//		this.status = status;
//		this.meta = meta;
//		this.total = total;
//		this.errors = errors;
//		this.data = data;
//		this.maxWorkFlowID = maxWorkFlowID;
//	}
	
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public ArrayList<String> getMeta() {
		return meta;
	}
	public void setMeta(ArrayList<String> meta) {
		this.meta = meta;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public ArrayList<Errors> getErrors() {
		return errors;
	}
	public void setErrors(ArrayList<Errors> errors) {
		this.errors = errors;
	}
	public ArrayList<WorkFlow> getData() {
		return data;
	}
	public void setData(ArrayList<WorkFlow> data) {
		this.data = data;
	}
	public int getMaxWorkFlowID() {
		return maxWorkFlowID;
	}
	public void setMaxWorkFlowID(int maxWorkFlowID) {
		this.maxWorkFlowID = maxWorkFlowID;
	}
	
}
