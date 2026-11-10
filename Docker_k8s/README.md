# IA-2 — Docker and Kubernetes

## Build context
Run Docker commands from `ia_2_code/` (the folder containing this Dockerfile). The Dockerfile copies the application from `app/`.

## Prerequisites
Docker Desktop with its engine running; Kubernetes enabled in Docker Desktop or Minikube; `kubectl` configured to the intended cluster.

## Build and test a standalone container
```bash
docker version
docker build -t student-management-portal:1.0.0 .
docker image ls student-management-portal
docker run --rm -d --name student-portal -p 3000:3000 student-management-portal:1.0.0
curl --fail http://127.0.0.1:3000/health
docker logs student-portal
docker stop student-portal
```

## Deploy
For Docker Desktop Kubernetes, its cluster can usually access the Docker Desktop image store:
```bash
kubectl config current-context
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl rollout status deployment/student-portal --timeout=120s
kubectl get deployments,pods,services
kubectl get endpoints student-portal
curl --fail http://127.0.0.1:30080/health
```
For Minikube, build the image then load it into Minikube before applying:
```bash
minikube image load student-management-portal:1.0.0
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
minikube service student-portal --url
```

## Cleanup
```bash
kubectl delete -f k8s/service.yaml
kubectl delete -f k8s/deployment.yaml
```
The sample app stores records in memory only. They are not persistent across Pod restarts.
