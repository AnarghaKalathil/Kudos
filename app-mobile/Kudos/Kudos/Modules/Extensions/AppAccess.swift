//
//  AppAccess.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 22/07/25.
//


import Foundation
class AppAccess {
    static let shared = AppAccess()
//    var currentUser : UserStruct = UserStruct(dict: [:])
    var token : String?
    var isLoggedIn : Bool?
    var session : String?
    var user : LoginModels.UserData?
    var skills: SkillModels.SkillModel?
    var categories: CategoryModel.CategoriesResponse?
    
    func saveUserData(_ user: LoginModels.UserData?) {
        do {
            let data = try JSONEncoder().encode(user)
            UserDefaults.standard.set(data, forKey: "currentUser")
            UserDefaults.standard.set(true, forKey: "isLoggedIn")
            UserDefaults.standard.set(user?.accessToken ?? "", forKey: "token")
        } catch {
            print("❌ Failed to save user: \(error)")
        }
    }
    func logoutUserData() {
        do {
            UserDefaults.standard.set(nil, forKey: "currentUser")
            UserDefaults.standard.set(false, forKey: "isLoggedIn")
            UserDefaults.standard.set("", forKey: "token")
        } catch {
            print("❌ Failed to logout user: \(error)")
        }
    }

    func saveSkillsData(_ skills: SkillModels.SkillModel?) {
        do {
            let data = try JSONEncoder().encode(skills)
            UserDefaults.standard.set(data, forKey: "skills")
        } catch {
            print("❌ Failed to save skills: \(error)")
        }
    }
    func loadSkillsData() {
        if let data = UserDefaults.standard.data(forKey: "skills") {
            do {
                let skills = try JSONDecoder().decode(SkillModels.SkillModel.self, from: data)
                AppAccess.shared.skills = skills
            } catch {
                print("❌ Failed to decode skills: \(error)")
            }
        }
    }
    func saveCategoryData(_ categories: CategoryModel.CategoriesResponse?) {
        do {
            let data = try JSONEncoder().encode(categories)
            UserDefaults.standard.set(data, forKey: "categories")
        } catch {
            print("❌ Failed to save categories: \(error)")
        }
    }
    func loadCategoryData() {
        if let data = UserDefaults.standard.data(forKey: "categories") {
            do {
                let category = try JSONDecoder().decode(CategoryModel.CategoriesResponse.self, from: data)
                AppAccess.shared.categories = category
            } catch {
                print("❌ Failed to decode categories: \(error)")
            }
        }
    }

    func loadUserData() {
        AppAccess.shared.isLoggedIn = UserDefaults.standard.bool(forKey: "isLoggedIn")
        AppAccess.shared.token = UserDefaults.standard.string(forKey: "token")
        if let data = UserDefaults.standard.data(forKey: "currentUser") {
            do {
                let user = try JSONDecoder().decode(LoginModels.UserData.self, from: data)
                AppAccess.shared.user = user
            } catch {
                print("❌ Failed to decode user: \(error)")
            }
        }
    }

}
