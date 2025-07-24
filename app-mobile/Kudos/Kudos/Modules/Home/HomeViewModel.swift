//
//  HomeViewModel.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 22/07/25.
//
import Alamofire
func performDashboardApi(
    completion: @escaping (_ status: Bool, _ response: HomeModels.DashboardResponse?) -> Void
) {
    let urlString = "\(BaseUrl.BASE_URL.rawValue)\(ApiEndPoints.dashboard.rawValue)"
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
                
                let dashboardResponse = try decoder.decode(HomeModels.DashboardResponse.self, from: data)
                print("✅ Dashboard Data: \(dashboardResponse)")
                completion(true, dashboardResponse)
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
func performSkillsApi(
    completion: @escaping (_ status: Bool, _ response: SkillModels.SkillModel?) -> Void
) {
    let urlString = "\(BaseUrl.BASE_URL.rawValue)\(ApiEndPoints.skills.rawValue)"
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
                
                let skillsResponse = try decoder.decode(SkillModels.SkillModel.self, from: data)
                print("✅ Skill Data: \(skillsResponse)")
                completion(true, skillsResponse)
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

func performCategoriesApi(
    completion: @escaping (_ status: Bool, _ response: CategoryModel.CategoriesResponse?) -> Void
) {
    let urlString = "\(BaseUrl.BASE_URL.rawValue)\(ApiEndPoints.category.rawValue)"
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
                
                let categoryResponse = try decoder.decode(CategoryModel.CategoriesResponse.self, from: data)
                print("✅ Category Data: \(categoryResponse)")
                completion(true, categoryResponse)
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

func performGetAllRecognitionApi(
    completion: @escaping (_ status: Bool, _ response: HomeModels.AllRecognitions?) -> Void
) {
    let urlString = "\(BaseUrl.BASE_URL.rawValue)\(ApiEndPoints.addRecognition.rawValue)"
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
                
                let recognitionResponse = try decoder.decode(HomeModels.AllRecognitions.self, from: data)
                print("✅ Rec Data: \(recognitionResponse)")
                completion(true, recognitionResponse)
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

func performProfileApi(
    completion: @escaping (_ status: Bool, _ response: HomeModels.ProfileData?) -> Void
) {
    let urlString = "\(BaseUrl.BASE_URL.rawValue)\(ApiEndPoints.profile.rawValue)"
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
                
                let profileResponse = try decoder.decode(HomeModels.ProfileData.self, from: data)
                print("✅ Profile Data: \(profileResponse)")
                completion(true, profileResponse)
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




