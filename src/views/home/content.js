import React,{Component } from 'react'
//时间格式
import moment from 'moment'
import { Link } from 'react-router-dom'

import {
  Modal,
  Card,
  Row,
  Col,
  Badge,
  Icon
} from "antd"

const site = 'http://web3n.com/'

import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const Meta = Card.Meta

export default class Content extends Component {
    _renderContent = () => {
        const { movies } = this.props

        return (
            <div style={{ padding: '30px'}}>
              <Row>
                  {
                      movies.map((it,i) => (
                          <Col 
                          key={i}
                          xl={{span:6}}
                          lg={{span:8}}
                          md={{span:12}}
                          sm={{span:24}}
                          style={{marginBottom:'8px'}}
                          >
                             <Card
                             bordered={false}
                             hoverable
                             style={{width:'100%'}}
                             actions={[
                                <Badge>
                                    <Icon style={{marginRight:'2px'}}
                                    type='clock-circle'/>
                                    {
                                    moment(it.meta.createdAt).fromNow(true)
                                    } 前更新
                                </Badge>,
                                <Badge>
                                    <Icon style={{marginRight:'2px'}}
                                    type='star'/>
                                    {
                                        moment(it.rate).fromNow(true)
                                    } 分
                                </Badge>
                             ]}
                             cover={
                                //  七牛云裁剪图片  "?imageMongr2/thumbnail/x1680/crop/1080x1600"
                                 <img src={ it.poster + "?imageMogr2/thumbnail/x1680/crop/1080x1600"} />
                             }
                             >
                                 <Meta
                                 style={{height:'202px',overflow:'hidden'}}
                                 title={<Link to={`/detail/${it._id}`}>{it.title}</Link>}
                                 description={<Link to={`/detail/${it._id}`}>{it.summary}</Link>}
                                 ></Meta>
                             </Card>
                          </Col>
                      ))
                  }
              </Row>

            </div>
        )
    }
    render (){
        return (
            <div style={{ padding:10 }}>
                {this._renderContent()}
            </div>
        )
    }
}