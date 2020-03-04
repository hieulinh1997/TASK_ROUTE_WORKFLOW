package com.task.route.workflow.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name="ワークフロールート")
public class WorkFlow {

	@Id
	@GeneratedValue()
	int seq;
	int workflow_id;
	String workflow_mei;
	Timestamp tekiyoukaishi_bi;
	Timestamp tekiyoushuryou_bi;
	int version;
	int yuukou_flg;
	
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public int getWorkflow_id() {
		return workflow_id;
	}
	public void setWorkflow_id(int workflow_id) {
		this.workflow_id = workflow_id;
	}
	public String getWorkflow_mei() {
		return workflow_mei;
	}
	public void setWorkflow_mei(String workflow_mei) {
		this.workflow_mei = workflow_mei;
	}
	public Timestamp getTekiyoukaishi_bi() {
		return tekiyoukaishi_bi;
	}
	public void setTekiyoukaishi_bi(Timestamp tekiyoukaishi_bi) {
		this.tekiyoukaishi_bi = tekiyoukaishi_bi;
	}
	public Timestamp getTekiyoushuryou_bi() {
		return tekiyoushuryou_bi;
	}
	public void setTekiyoushuryou_bi(Timestamp tekiyoushuryou_bi) {
		this.tekiyoushuryou_bi = tekiyoushuryou_bi;
	}
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public int getYuukou_flg() {
		return yuukou_flg;
	}
	public void setYuukou_flg(int yuukou_flg) {
		this.yuukou_flg = yuukou_flg;
	}
	
	
//	@Override
//	public String toString() {
//		return "WorkFlow [seq=" + seq + ", workFlowID=" + workFlowID + ", workFlowMei=" + workFlowMei
//				+ ", teKiYouKaiShi_Bi=" + teKiYouKaiShi_Bi + ", teKiYouShuRyOu_Bi=" + teKiYouShuRyOu_Bi + ", version="
//				+ version + ", yuuKou_Flg=" + yuuKou_Flg + "]";
//	}
	
	
//	public WorkFlow(int seq, int workFlowID, String workFlowMei, Timestamp teKiYouKaiShi_Bi,
//			Timestamp teKiYouShuRyOu_Bi, int version, int yuuKou_Flg) {
//		super();
//		this.seq = seq;
//		this.workFlowID = workFlowID;
//		this.workFlowMei = workFlowMei;
//		this.teKiYouKaiShi_Bi = teKiYouKaiShi_Bi;
//		this.teKiYouShuRyOu_Bi = teKiYouShuRyOu_Bi;
//		this.version = version;
//		this.yuuKou_Flg = yuuKou_Flg;
//	}
	
	

	
}
