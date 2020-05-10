import React from "react";
import UserContext from "src/UserContext";
import { LearningLimits } from "src/components/LearningLimits/LearningLimits";

interface LearningLimitsProps {
  limitOfConsecutiveLearningDays?: number;
  limitOfLearningDaysPerMonth?: number;
  limitOfLearningDaysPerQuarter?: number;
  limitOfLearningDaysPerYear?: number;
}
interface LearningLimitsState {
  limitOfConsecutiveLearningDays?: number;
  limitOfLearningDaysPerMonth?: number;
  limitOfLearningDaysPerQuarter?: number;
  limitOfLearningDaysPerYear?: number;
}

export default class LimitViewer extends React.Component<LearningLimitsProps, LearningLimitsState> {
  state: LearningLimitsState = {}
  componentDidMount(): void {
    if (!UserContext.user)
      throw new Error("Should never reach this calendar when not logged in");

    UserContext
      .fetch(`api/limit/user/${UserContext.user.id}`)
      .then((response) => {
        if (!response.ok) {
          //set error
          return;
        }
        
        return response.json();
      })
      .then((learningLimits: LearningLimitsState) => {
        this.setState({ 
          limitOfConsecutiveLearningDays: learningLimits.limitOfConsecutiveLearningDays,
          limitOfLearningDaysPerMonth: learningLimits.limitOfLearningDaysPerMonth,
          limitOfLearningDaysPerQuarter: learningLimits.limitOfLearningDaysPerQuarter,
          limitOfLearningDaysPerYear: learningLimits.limitOfLearningDaysPerYear });
      });
  }
  
  render(): React.ReactNode {
    let limitOrigin: string;
    if (!this.state.limitOfConsecutiveLearningDays) 
      limitOrigin = "Unknown";
    else if(!UserContext.user?.limitId) 
      limitOrigin = "Limits based on team resitrictions";
    else
      limitOrigin = "Limits based on your personal resitrictions"; 
    return (
      <LearningLimits
        limitOrigin = {limitOrigin}
        limitOfConsecutiveLearningDays = {this.state.limitOfConsecutiveLearningDays ?? 0} 
        limitOfLearningDaysPerMonth = {this.state.limitOfLearningDaysPerMonth ?? 0} 
        limitOfLearningDaysPerQuarter = {this.state.limitOfLearningDaysPerQuarter ?? 0} 
        limitOfLearningDaysPerYear = {this.state.limitOfLearningDaysPerYear ?? 0} 
      />
    );
  }
}
