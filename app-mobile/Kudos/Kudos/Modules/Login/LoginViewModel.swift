//
//  Untitled.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 21/07/25.
//
import Foundation
import Alamofire

func performLoginApi(
    loginModel: LoginModels.LoginRequest,
    completion: @escaping (_ status: Bool, _ response: LoginModels.LoginResponse?) -> Void
) {
    let urlString = "\(BaseUrl.BASE_URL.rawValue)\(ApiEndPoints.login.rawValue)"

    let parameters: [String: Any] = [
        "email": loginModel.email ?? "",
        "password": loginModel.password ?? ""
    ]
    print("urlString", urlString)
    AF.request(urlString,
               method: .post,
               parameters: parameters,
               encoding: JSONEncoding.default,
               headers: nil)
    .validate(statusCode: 200..<300)
    .responseData { response in
        switch response.result {
        case .success(let data):
            do {
                let jsonObj = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
                if let dataJson = jsonObj{
                    if let loginResponse = try LoginModels.LoginResponse.objectFrom(json: dataJson) {
                        print("User: \(loginResponse.data.username)")
                        completion(true, loginResponse)
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
