import React from "react";
import {Text,TouchableOpacity,View} from "react-native";
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barCode-scanner";
export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedBookId:"",
            scannedStudentId:"",
            buttonState:"normal"
        }
    }
    getCameraPermissions=async (id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:id,
            scanned:false
        });
    }
    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:"normal"
        });
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState!=="normal" && hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScan={scanned?undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            );
        }
        else if (buttonState==="normal"){
        return(
            <View style={styles.container}>
                <View>
                    <Image
                    source={require("../assets/booklogo.jpg")}
                    style={{width:200,height:200}}
                    />
                    <Text style={{textAlign:"center",fontSize:30}}>E-LIBRARY</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputBox} 
                    placeHolder="books ID"
                    value={this.state.scannedBookId}
                    />
                    <TouchableOpacity style={styles.scanButton}
                    onPress={()=>{
                    this.getCameraPermissions("bookId")
                    } } >
                        <Text style={styles.buttonText}>scan</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.inputView}>
                    <TextInput style={styles.inputBox} 
                    placeHolder="student ID"
                    value={this.state.scannedStudentId}
                    />
                    <TouchableOpacity style={styles.scanButton}
                    onPress={()=>{
                        this.getCameraPermissions("studentId")
                        } } >
                        <Text style={styles.buttonText}>scan</Text>
                    </TouchableOpacity>
                    </View>

               
            </View>
        );
        }
    }
}
const styles=StyleSheet.create({
container:{
    flex:1,justifyContent:"center",alignItems:"center"
},
displayText:{
    fontSize:15,TextDecorationLine:"underline",
}, 
scanButton:{backgroundColor:"#2196F3",width:50,borderWidth:1.5,borderLeftWidth:0}, 
buttonText:{fontSize:50,textAlign:"center",marginTop:10},
inputView:{flexDirection:"row",margin:20},
inputBox:{width:200,height:40,borderWidth:1.5,borderRightWidth:0,fontSize:20}
});