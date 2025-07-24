//
//  PeopleViewModel.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 22/07/25.
//
import Alamofire

func performPeopleApi(
    completion: @escaping (_ status: Bool, _ response: PeopleModel.PeopleResponse?) -> Void
) {
    let urlString = "\(BaseUrl.BASE_URL.rawValue)\(ApiEndPoints.people.rawValue)"
    print(urlString)
    let headers: HTTPHeaders = [
        "Authorization": "Bearer \(AppAccess.shared.token ?? "")"
    ]
    AF.request(urlString,
               method: .get,
               parameters: nil,
               encoding: JSONEncoding.default,
               headers: headers)
    .validate(statusCode: 200..<300)
    .responseData { response in
        switch response.result {
        case .success(let data):
            do {
                let decoder = JSONDecoder()
                // Optional: only use this if your model does not have CodingKeys
                // decoder.keyDecodingStrategy = .convertFromSnakeCase
                
                let peopleResponse = try decoder.decode(PeopleModel.PeopleResponse.self, from: data)
                print("✅ People Data: \(peopleResponse)")
                completion(true, peopleResponse)
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
