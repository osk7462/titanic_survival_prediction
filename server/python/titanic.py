import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json
import os
from pandas.plotting import scatter_matrix
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
import category_encoders as ce
import joblib
import sys


def get_path():
    new_path = "response_data"
    my_path = os.path.dirname(os.path.realpath(__file__))
    # my_path = os.path.join(my_path, 'python')
    try:
        my_path = os.path.join(my_path, str(os.mkdir(my_path +"/"+ new_path)))
        
    except OSError:
        # print(OSError.messageprint(my_path))
        my_path = os.path.join(my_path, new_path)
    return my_path


def load_data(server_route):
    path = get_path()
    df = pd.read_csv("./python/titanic.csv".format(path))
    nan_value = str(df.isna().sum())
    df['Age'] = df['Age'].fillna(df['Age'].mean())
    df.dropna(subset=['Embarked'], inplace=True)
    nan_value_age_mean = str(df.isna().sum())
    describe = str(df.describe())
    shape = str(df.shape)
    cols = str(df.columns.value_counts().sum())
    cold_list = cols = df.columns.tolist()
    dtypes = str(df.dtypes)
    num_cols = df.select_dtypes([np.int64, np.float64]).columns.tolist()
    num_cols.remove('PassengerId')
    cols_wo_passenger = str(num_cols)
    figure = []
    for col in num_cols:
        df.hist(column=col)
        plt.savefig('{}/{}.png'.format(path, str(col)))
        figure.append('{}/{}.png'.format(server_route, str(col)))
    scatter_matrix(df[num_cols], figsize=(50, 50))
    plt.savefig("{}/{}.png".format(path, "scatter_matrix"))
    figure.append("{}/{}.png".format(server_route, "scatter_matrix"))
    obj_cols = df.select_dtypes([np.object]).columns.tolist()
    for col in obj_cols:
        df[col].value_counts().plot(kind='bar')
    y = pd.Series(df['Survived'])
    drop_list = ['Survived', 'Name', 'Ticket', 'Cabin']
    X = df.drop(drop_list, axis=1)
    encoder=ce.OneHotEncoder(handle_unknown='return_nan', return_df=True, use_cat_names=True)
    X = encoder.fit_transform(X)
    encoded = str(X)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

    model = RandomForestClassifier()
    model.fit(X_train,y_train)

    train_preds = model.predict(X_train)

    training_score = {
        "accuracy_score": accuracy_score(train_preds, y_train),
        "f1_score": f1_score(train_preds, y_train),
        "roc_auc_score": roc_auc_score(train_preds, y_train)
    }

    test_preds = model.predict(X_test)
    testing_score = {
        "accuracy_score": accuracy_score(test_preds,y_test),
        "f1_score": f1_score(test_preds,y_test),
        "roc_auc_score": roc_auc_score(test_preds,y_test)
    }
    
    joblib.dump(model, "{}/model_joblib".format(get_path()))

    response = {
        "nan_value": nan_value,
        "nan_value_age_mean": nan_value_age_mean,
        "describe": describe,
        "shape": shape,
        "cols": cols,
        "cold_list": cold_list,
        "dtypes": dtypes,
        "cols_wo_passenger": cols_wo_passenger,
        "encoded": encoded,
        "training_score": training_score,
        "testing_score": testing_score,
        "figures_url": figure

    }
    with open("{}/response.txt".format(get_path()), "w") as res:
        json.dump(response, res)

    return json.dumps(response)


def make_prediction(user_input, server_route):
    try:
        loaded_model = joblib.load("{}/model_joblib".format(get_path()))
    except IOError:
        load_data(server_route)
        loaded_model = joblib.load("{}/model_joblib".format(get_path()))

    a = np.asarray(user_input).reshape(1, -1)
    predicted_value = loaded_model.predict(a)
    return str(predicted_value[0])


def get_exploratory_data(server_route):
    try:
        with open("{}/response.txt".format(get_path()), "r") as response:
            return response.read()
    except IOError:
        return load_data(server_route)


if __name__ == '__main__':
    if sys.argv[1] == "get_exploratory_data":
        print(json.dumps({"status": "ok", "data": get_exploratory_data(sys.argv[2])}))
    elif sys.argv[1] == "make_prediction":
        user_input = []
        status = 200
        for i in range(3, 14):
            try:
                user_input.append(float(sys.argv[i]))
            except TypeError:
                status = 404
        print(json.dumps({"status": status, "predicted_value": make_prediction(user_input, sys.argv[2] )       }))
