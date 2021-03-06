import buffer from '@turf/buffer'
import { point, lineString, polygon } from '@turf/helpers'

import Map from 'ol/Map';
import GeoJSON from "ol/format/GeoJSON";
import Vector from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { viewFlyTo } from "../common/flyTo";
import * as olProj from 'ol/proj';
// 定义渲染的缓冲区图层
let pointSource
let lineSource
let polygonSource
let pointLayer:VectorLayer
let lineLayer:VectorLayer
let polygonLayer:VectorLayer

export function pointBuffer(map:Map) {
    if (pointLayer) {
        map.removeLayer(pointLayer);
    }
    if (lineLayer) {
        map.removeLayer(lineLayer);
    }
    if (polygonLayer) {
        map.removeLayer(polygonLayer);
    }
    //创建缓冲数据
    let points = point([116.53898130231798, 39.76589466010563]);
    let pointBuffer = buffer(points, 200, { units: 'meters' });
    //创建数据geojson对象和数据源对象
    let format = new GeoJSON();
    pointSource = new Vector();
    //读取geojson数据
    let pointFeature:any = format.readFeature(points);
    let pointBufferFeature:any = format.readFeature(pointBuffer);
    pointFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    pointBufferFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    //将数据添加数据源的
    pointSource.addFeature(pointFeature);
    pointSource.addFeature(pointBufferFeature);
    //添加图层
    pointLayer = new VectorLayer({ source: pointSource })
    map.addLayer(pointLayer);
    viewFlyTo(map, olProj.transform([116.53898130231798, 39.76589466010563], 'EPSG:4326', 'EPSG:3857'));
}

export function lineBuffer(map:Map) {
    if (pointLayer) {
        map.removeLayer(pointLayer);
    }
    if (lineLayer) {
        map.removeLayer(lineLayer);
    }
    if (polygonLayer) {
        map.removeLayer(polygonLayer);
    }
    //创建缓冲数据
    let line = lineString([[116.53898130231798, 39.76589466010563], [116.53681172371465, 39.763347994750745]]);
    let lineBuffer = buffer(line, 0.2, { units: 'kilometers' });
    //创建数据geojson对象和数据源对象
    let format = new GeoJSON();
    lineSource = new Vector()
    //读取geojson数据
    let lineFeature:any = format.readFeature(line);
    let lineBufferFeature:any = format.readFeature(lineBuffer);
    lineFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    lineBufferFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    //将数据添加数据源的
    lineSource.addFeature(lineFeature);
    lineSource.addFeature(lineBufferFeature);
    //添加图层
    lineLayer = new VectorLayer({ source: lineSource })
    map.addLayer(lineLayer);
    // viewFlyTo(map,[114.2058, 33.2469]);
}
export function polygonBuffer(map:Map) {
    if (pointLayer) {
        map.removeLayer(pointLayer);
    }
    if (lineLayer) {
        map.removeLayer(lineLayer);
    }
    if (polygonLayer) {
        map.removeLayer(polygonLayer);
    }
    //创建缓冲数据
    let polygons = polygon([[[116.53864363191849, 39.76466710762628], [116.54006536756104, 39.765547816226416], [116.53918723672301, 39.76665350742422], [116.53757314861116, 39.76588852529056], [116.53864363191849, 39.76466710762628]]]);
    let polygonBuffer = buffer(polygons, 0.2, { units: 'kilometers' });
    //创建数据geojson对象和数据源对象
    let format = new GeoJSON();
    polygonSource = new Vector()
    //读取geojson数据
    let polygonFeature:any = format.readFeature(polygons);
    let polygonBufferFeature:any = format.readFeature(polygonBuffer);
    polygonFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    polygonBufferFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    //将数据添加数据源的
    polygonSource.addFeature(polygonFeature);
    polygonSource.addFeature(polygonBufferFeature);
    //添加图层
    /* if (polygonLayer) {
        console.log("111");
        map.removeLayer(polygonLayer);
        polygonLayer.setSource(polygonSource)
        map.addLayer(polygonLayer);
    }else {
        polygonLayer = new VectorLayer({ source: polygonSource })
        map.addLayer(polygonLayer);
    } */
    polygonLayer = new VectorLayer({ source: polygonSource })
    map.addLayer(polygonLayer);
    // viewFlyTo(map,[114.2058, 33.2469]);    
}

export function delBuffer(map:Map) {
    /* if (pointLayer) {
        pointLayer.setSource(null);
        map.removeLayer(pointLayer);
    }else if (lineLayer){
        lineLayer.setSource(null);
        map.removeLayer(lineLayer);
    }else if (polygonLayer){
        polygonLayer.setSource(null);
        map.removeLayer(polygonLayer);
    } */
    map.removeLayer(pointLayer);
    map.removeLayer(lineLayer);
    map.removeLayer(polygonLayer);
}
