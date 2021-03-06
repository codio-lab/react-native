import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,ScrollView, FlatList,Button } from 'react-native'
import CardBottom from "./CardBottom"
import Head from './CardHead'
import CardBody from './CardBody'
import Status from '../Status/Status'
export default function Postcard({data}) {
    const [datais,setData] = useState([])
    useEffect(() => {
        if(data){
            setData(data)
        }
        return () => {
            data
        }
    }, [])
    const likehandler = (key) => {
            let newArray = datais.map((item)=>{
                if (item.key===key){
                    item.likes += 1
                }
                return item
            })
            setData(newArray)
 
    }
    const scrollEventListener = () => {}
    const like = "likes this"
    const comment = "commented on this"
    const curious = "is curious about this"
    
    return (
        <View style={styles.backStyle}>
        <ScrollView onScroll={()=>console.log()}>
        <Status />
        <View>
        <FlatList data={datais} 
            
            nestedScrollEnabled
            renderItem={({item})=>(
                item.like?<View style={styles.container}>
                        <Head name={item.name} emotion={like} />
                            <CardBody post={item.post} 
                                image = {item.image}
                                profile = {item.profile}
                                likes={item.likes} 
                                comments={item.comments} />
                        <CardBottom liked={()=>likehandler(item.key)} />
                    </View>:item.curious? <View style={styles.container}>
                        <Head name={item.name} emotion={curious} />
                            <CardBody post={item.post} 
                                image = {item.image}
                                profile = {item.profile}
                                likes={item.likes} 
                                comments={item.comments} />
                        <CardBottom liked={()=>likehandler(item.key)} />
                    </View>:item.comment ? <View style={styles.container}>
                        <Head name={item.name} emotion={comment} />
                            <CardBody post={item.post} 
                                image = {item.image}
                                profile = {item.profile}
                                likes={item.likes} 
                                comments={item.comments}
                            />
                        <CardBottom  liked={()=>likehandler(item.key)}/>
                    </View>:null)
        } />
        </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:7,
        borderColor:"#ccc",
        borderTopWidth:1,
        borderBottomWidth:1,
        backgroundColor:"white"
    },
    backStyle:{
        backgroundColor:"#dedede",
    }
})
