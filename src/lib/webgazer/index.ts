import "@tensorflow/tfjs";
//import(/* webpackPreload: true */ '@tensorflow/tfjs');
//import(/* webpackChunkName: 'pageA' */ './vendors~main.js')

import "regression";
import params from "./params.mjs";
import localforage from "localforage";
import TFFaceMesh from "./facemesh.mjs";
import Reg from "./ridgeReg.mjs";
import ridgeRegWeighted from "./ridgeWeightedReg.mjs";
import ridgeRegThreaded from "./ridgeRegThreaded.mjs";
import util from "./util.mjs";

type MouseEvents = "click" | "move";
type GazeTracker = "TFFaceMesh";
type RegressionType = "ridge" | "ridgeWeighted" | "ridgeThreaded";

interface WebGazer {
  begin: () => Promise<WebGazer>;
  isReady: () => boolean;
  pause: () => WebGazer;
  resume: () => WebGazer;
  end: () => WebGazer;
  stopVideo: () => WebGazer;
  detectCompatibility: () => Promise<boolean>;
  showVideoPreview: () => WebGazer;
  hideVideoElement: (element: HTMLDivElement) => void;
  showVideo: (flag: boolean) => WebGazer;
  showFaceOverlay: (flag: boolean) => WebGazer;
  showFaceFeedbackBox: (flag: boolean) => WebGazer;
  showPredictionPoints: (flag: boolean) => WebGazer;
  saveDataAcrossSessions: (flag: boolean) => WebGazer;
  applyKalmanFilter: (flag: boolean) => WebGazer;
  setCameraConstaints: (constraints: object) => WebGazer;
  setInternalVideoBufferSizes: (width: number, height: number) => WebGazer;
  setStaticVideo: (videoLoc: string) => WebGazer;
  setVideoViewerSize: (width: number, height: number) => void;
  setTracker: (tracker: GazeTracker) => WebGazer;
  addTrackerModule: (name: string, constructor: ) => WebGazer;
  setRegression: (regression: RegressionType) => WebGazer;
  addMouseEventListeners: () => WebGazer;
  removeMouseEventListeners: () => WebGazer;
  recordScreenPosition: (
    x: number,
    y: number,
    eventType: MouseEvents
  ) => WebGazer;
  storePoints: (x: number, y: number) => void;
  getTracker: () => object;
  getRegression: () => number[];
  getCurrentPrediction: (regIndex: number) => any;
  clearData: () => void;
}

class WebGazer {
  public tracker: object;

  private videoStream: MediaStream = null;
  private videoContainerElement: HTMLDivElement = null;
  private videoElement = null;
  private videoElementCanvas: HTMLCanvasElement = null;
  private faceOverlay = null;
  private faceFeedbackBox = null;
  private gazeDot = null;

  private debugVideoLoc = "";

  private constructor() {
    this.tracker = {};
    this.reg = {};
    this.util = {};
    this.params = {};
  }
}
