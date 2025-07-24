//
//  RecognitionViewModel.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 23/07/25.
//

import Alamofire

func performAddRecognitionApi(
    RecReqModel: RequestModels.RecognitionReq,
    completion: @escaping (_ status: Bool, _ response: RequestModels.RecognitionResponse?) -> Void
) {
    let urlString = "\(BaseUrl.BASE_URL.rawValue)\(ApiEndPoints.addRecognition.rawValue)"
    let headers: HTTPHeaders = [
        "Authorization": "Bearer \(AppAccess.shared.token ?? "")"
    ]
    let parameters: [String: Any] = [
        "sender": RecReqModel.sender ?? 0,
        "receiver": RecReqModel.receiver ??  0,
        "category": RecReqModel.category ?? 0,
        "message": RecReqModel.message ?? "",
        "skills": RecReqModel.skills,
        "reviewer": RecReqModel.reviewer ?? 0
    ]
    print("urlString", urlString)
    
    AF.request(urlString,
               method: .post,
               parameters: parameters,
               encoding: JSONEncoding.default,
               headers: headers)
    .validate(statusCode: 200..<300)
    .responseData { response in
        switch response.result {
        case .success(let data):
            do {
                let jsonObj = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
                if let dataJson = jsonObj{
                    if let recognitionResponse = try RequestModels.RecognitionResponse.objectFrom(json: dataJson) {
                        print("Recognition: \(recognitionResponse)")
                        completion(true, recognitionResponse)
                        return
                    }
                }
                completion(false, nil)
            } catch {
                print("❌ Parsing failed: \(error)")
                completion(false, nil)
            }
            
        case .failure(let error):
            print("❌ Request failed: \(error.localizedDescription)")
            completion(false, nil)
        }
    }
}

func performStatusApi(
    reqModel: RequestModels.RecognitionStatusReq,
    completion: @escaping (_ status: Bool, _ response: RequestModels.RecognitionResponse?) -> Void
) {
    let urlString = "\(BaseUrl.BASE_URL.rawValue)\(ApiEndPoints.recognitionStatus.rawValue)"

    let parameters: [String: Any] = [
        "id": reqModel.id ?? 0,
        "status": reqModel.status ?? ""
    ]
    let headers: HTTPHeaders = [
        "Authorization": "Bearer \(AppAccess.shared.token ?? "")"
    ]
    print("urlString", urlString)
    AF.request(urlString,
               method: .post,
               parameters: parameters,
               encoding: JSONEncoding.default,
               headers: headers)
    .validate(statusCode: 200..<300)
    .responseData { response in
        switch response.result {
        case .success(let data):
            do {
                let jsonObj = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
                if let dataJson = jsonObj{
                    print("Status: \(dataJson)")
                    if let statusResponse = try RequestModels.RecognitionResponse.objectFrom(json: dataJson) {
                        print("Status: \(statusResponse)")
                        completion(true, statusResponse)
                        return
                    }
                }
                completion(false, nil)
            } catch {
                print("❌ Parsing failed: \(error)")
                completion(false, nil)
            }

        case .failure(let error):
            print("❌ Request failed: \(error.localizedDescription)")
            completion(false, nil)
        }
    }
}
