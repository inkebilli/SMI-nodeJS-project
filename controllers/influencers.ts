import {Response} from 'express'
import { db } from '../firebase'

//influencer type mirroring the db
type InfluencerType = {
    influencerId: number,
    name: string,
    email: number, // could be removed to follow description.pdf (3.purchasesPerBrand->3. influencers)
    banner:string,
    affiliate_id:number, // could be removed to follow description.pdf (3.purchasesPerBrand->3. influencers)
    createdAt: Date,
}

// a type representing a Request
type Request ={
    body: InfluencerType,
    params: {requestedInfluencerId : string}
}


//async function getAllInfluencers to get the list of all influencers
const getAllInfluencers = async (req: Request, res: Response) => {
  try {
    const allInfluencers: InfluencerType[] = []
    // get a snapshot of the data
    const querySnapshot = await db.collection('influencers').get()
    // we can(or should) modify the data here and only return what we need (allInfluencers.push({id: doc.id,...doc.data()}))
    querySnapshot.forEach((doc: any) => allInfluencers.push(doc.data()))
    return res.status(200).json(allInfluencers)
  } catch(error: any) { return res.status(500).json(error.message) }
}

//async function updateInfluencer to update influencer by influencerId
const updateInfluencer = async (req: Request, res: Response) => {
  const { body: { influencerId, name, email, banner, affiliate_id },
          params: { requestedInfluencerId } } = req
  try {
    // get influencer by influencerId  
    const influencer = db.collection('entries').doc(requestedInfluencerId)
    const currentData = (await influencer.get()).data() || {}

    //preparing influencerObject 
    const influencerObject = {
      influencerId: influencerId || currentData.influencerId,
      name: name || currentData.name,
      email: email || currentData.email,
      banner: banner || currentData.banner,
      affiliate_id: affiliate_id || currentData.affiliate_id,
    }

    // put (set) influencerObject in influencer ref. to update it
    await influencer.set(influencerObject).catch((error:any) => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'influencer updated successfully',
      data: influencerObject
    })
  }
  catch(error:any) { return res.status(500).json(error.message) }
}

//async function deleteInfluencer to delete influencer by influencerId
const deleteInfluencer = async (req: Request, res: Response) => {
  const { requestedInfluencerId } = req.params

  try {
    //get a ref to the influencer to be deleted
    const influencer = db.collection('entries').doc(requestedInfluencerId)

    await influencer.delete().catch((error:any) => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'influencer deleted successfully',
    })
  }
  catch(error:any) { return res.status(500).json(error.message) }
}

//async function addInfluencer to insert one new influencer
const addInfluencer = async (req:Request, res: Response) =>{
  //destruct the request body
    const { name, email, banner, affiliate_id } = req.body
    try {
      const influencer = db.collection('influencers').doc()
      const influencerObject =  { 
      name: name  ,
      email: email  ,
      banner: banner  ,
      affiliate_id: affiliate_id  ,
    }
      //post (set) influencerObject to insert it to the db
      await influencer.set(influencerObject)

      res.status(200).send({
        status: 'success',
        message:'Influencer added successfully',
        data: influencerObject
      })
    } catch( error:any ){
        res.status(500).json(error.message)
    }
}

export {addInfluencer,deleteInfluencer, updateInfluencer, getAllInfluencers}

// to avoid using error type as 'any' in catch blocks it would be much better to impliment something like this:
// https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript